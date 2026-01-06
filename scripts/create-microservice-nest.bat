@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

:: ============================================
:: GET PROJECT ROOT (hivehub folder)
:: ============================================
set "SCRIPT_DIR=%~dp0"
set "PROJECT_ROOT=%SCRIPT_DIR%.."
cd /d "%PROJECT_ROOT%"

echo Project root: %CD%
echo.

:: ============================================
:: CONFIGURATION
:: ============================================
echo Enter service name (e.g., user-service):
set /p SERVICE_NAME=
echo Enter service port (e.g., 3002):
set /p SERVICE_PORT=
echo Enter database name (e.g., user_db):
set /p DB_NAME=

:: ============================================
:: CREATE SERVICES FOLDER
:: ============================================
if not exist "services" mkdir "services"

:: ============================================
:: STEP 1: CREATE NESTJS PROJECT
:: ============================================
echo.
echo [1/12] Creating NestJS project in services/%SERVICE_NAME%...
cd services
call npx @nestjs/cli new %SERVICE_NAME% --package-manager npm --skip-git
cd %SERVICE_NAME%

:: ============================================
:: STEP 2: INSTALL DEPENDENCIES
:: ============================================
echo.
echo [2/12] Installing dependencies...
call npm install @nestjs/config @nestjs/microservices @nestjs/throttler class-validator class-transformer winston helmet
call npm install amqplib amqp-connection-manager @prisma/client
call npm install -D prisma @types/node

:: ============================================
:: STEP 3: GENERATE MODULES
:: ============================================
echo.
echo [3/12] Generating modules...

echo y | call npx @nestjs/cli g module health
echo y | call npx @nestjs/cli g controller health --no-spec
echo y | call npx @nestjs/cli g service health --no-spec

echo y | call npx @nestjs/cli g module rabbitmq
echo y | call npx @nestjs/cli g service rabbitmq --no-spec

echo y | call npx @nestjs/cli g module config

:: ============================================
:: STEP 4: CREATE PRISMA SCHEMA
:: ============================================
:: ============================================
:: STEP 4: CREATE PRISMA SCHEMA (ИСПРАВЛЕННЫЙ)
:: ============================================
echo.
echo [4/12] Creating Prisma schema...
mkdir prisma

(
echo generator client {
echo   provider = "prisma-client-js"
echo }
echo.
echo datasource db {
echo   provider = "postgresql"
echo   url      = env("DATABASE_URL")
echo }
echo.
echo model ServiceModel {
echo   id        String   @id @default(cuid())
echo   createdAt DateTime @default(now())
echo   updatedAt DateTime @updatedAt
echo }
) > prisma\schema.prisma

if exist prisma\schema.prisma (
  echo Prisma schema created successfully
) else (
  echo ERROR: Failed to create prisma schema
  pause
  exit /b 1
)

:: ============================================
:: STEP 5: CREATE DOCKERFILE.DEV
:: ============================================
echo.
echo [5/12] Creating Dockerfile.dev...
(
echo FROM node:18-alpine
echo.
echo WORKDIR /app
echo.
echo COPY package*.json ./
echo RUN npm ci --ignore-scripts
echo.
echo COPY . .
echo RUN npx prisma generate
echo.
echo EXPOSE %SERVICE_PORT%
echo.
echo CMD ["npm", "run", "start:dev"]
) > Dockerfile.dev

:: ============================================
:: STEP 6: CREATE .ENV FILES
:: ============================================
echo.
echo [6/12] Creating .env files...
(
echo PORT=%SERVICE_PORT%
echo NODE_ENV=development
echo DATABASE_URL=postgresql://hivehub:hivehub123@postgres-%SERVICE_NAME%:5432/%DB_NAME%
echo RABBITMQ_URL=amqp://admin:admin123@rabbitmq:5672
) > .env

(
echo PORT=%SERVICE_PORT%
echo NODE_ENV=development
echo DATABASE_URL=
echo RABBITMQ_URL=
) > .env.example

:: ============================================
:: STEP 7: UPDATE HEALTH MODULE
:: ============================================
echo.
echo [7/12] Updating health module...

(
echo import { Controller, Get } from '@nestjs/common';
echo import { HealthService } from './health.service';
echo.
echo @Controller('health')
echo export class HealthController {
echo   constructor(private readonly healthService: HealthService) {}
echo.
echo   @Get()
echo   checkHealth() {
echo     return this.healthService.checkHealth();
echo   }
echo }
) > src\health\health.controller.ts

(
echo import { Injectable } from '@nestjs/common';
echo.
echo @Injectable()
echo export class HealthService {
echo   checkHealth() {
echo     return {
echo       status: 'ok',
echo       service: '%SERVICE_NAME%',
echo       timestamp: new Date().toISOString(),
echo       version: '1.0.0',
echo     };
echo   }
echo }
) > src\health\health.service.ts

:: ============================================
:: STEP 8: UPDATE CONFIG MODULE
:: ============================================
(
echo import { Module } from '@nestjs/common';
echo import { ConfigModule } from '@nestjs/config';
echo.
echo @Module({
echo   imports: [
echo     ConfigModule.forRoot({
echo       isGlobal: true,
echo       envFilePath: '.env',
echo     }),
echo   ],
echo   exports: [ConfigModule],
echo })
echo export class ConfigModule {}
) > src\config\config.module.ts

:: ============================================
:: STEP 9: CREATE RABBITMQ CONSTANTS
:: ============================================
echo.
echo [9/12] Creating RabbitMQ constants...

mkdir src\rabbitmq\interfaces 2>nul

(
echo export const RABBITMQ_CONSTANTS = {
echo   QUEUES: {
echo     SERVICE_EVENTS: '%SERVICE_NAME%.events',
echo   },
echo   EVENTS: {
echo     TEST_EVENT: 'TEST_EVENT',
echo     HEALTH_CHECK: 'HEALTH_CHECK',
echo   },
echo } as const;
) > src\rabbitmq\rabbitmq.constants.ts

:: ============================================
:: STEP 10: UPDATE RABBITMQ SERVICE
:: ============================================
(
echo import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
echo import { connect, Channel, Connection } from 'amqplib';
echo import { RABBITMQ_CONSTANTS } from './rabbitmq.constants';
echo.
echo interface BaseEvent {
echo   type: string;
echo   service: string;
echo   timestamp: string;
echo   data?: any;
echo }
echo.
echo @Injectable()
echo export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
echo   private connection: Connection;
echo   private channel: Channel;
echo.
echo   async onModuleInit() {
echo     try {
echo       const url = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
echo       this.connection = await connect(url);
echo       this.channel = await this.connection.createChannel();
echo       console.log('[RabbitMQ] Connected');
echo.
echo       const queues = Object.values(RABBITMQ_CONSTANTS.QUEUES);
echo       for (const queue of queues) {
echo         await this.channel.assertQueue(queue, { durable: true });
echo       }
echo     } catch (error) {
echo       console.error('[RabbitMQ] Error:', error.message);
echo     }
echo   }
echo.
echo   async onModuleDestroy() {
echo     await this.channel?.close();
echo     await this.connection?.close();
echo   }
echo.
echo   async publishEvent(queue: string, event: BaseEvent) {
echo     if (!this.channel) return false;
echo     const message = Buffer.from(JSON.stringify(event));
echo     return this.channel.sendToQueue(queue, message, { persistent: true });
echo   }
echo.
echo   async publishTestEvent() {
echo     const event: BaseEvent = {
echo       type: RABBITMQ_CONSTANTS.EVENTS.TEST_EVENT,
echo       service: '%SERVICE_NAME%',
echo       timestamp: new Date().toISOString(),
echo     };
echo     return this.publishEvent(RABBITMQ_CONSTANTS.QUEUES.SERVICE_EVENTS, event);
echo   }
echo }
) > src\rabbitmq\rabbitmq.service.ts

:: ============================================
:: STEP 11: UPDATE APP MODULE AND CONTROLLER
:: ============================================
echo.
echo [11/12] Updating app module...

(
echo import { Module } from '@nestjs/common';
echo import { AppController } from './app.controller';
echo import { AppService } from './app.service';
echo import { ConfigModule } from './config/config.module';
echo import { HealthModule } from './health/health.module';
echo import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
echo.
echo @Module({
echo   imports: [ConfigModule, HealthModule, RabbitMQModule],
echo   controllers: [AppController],
echo   providers: [AppService],
echo })
echo export class AppModule {}
) > src\app.module.ts

(
echo import { Controller, Get } from '@nestjs/common';
echo import { AppService } from './app.service';
echo import { RabbitMQService } from './rabbitmq/rabbitmq.service';
echo.
echo @Controller()
echo export class AppController {
echo   constructor(
echo     private readonly appService: AppService,
echo     private readonly rabbitMQService: RabbitMQService,
echo   ) {}
echo.
echo   @Get()
echo   getHello(): string {
echo     this.rabbitMQService.publishTestEvent();
echo     return this.appService.getHello();
echo   }
echo }
) > src\app.controller.ts

:: ============================================
:: STEP 12: UPDATE PACKAGE.JSON
:: ============================================
echo.
echo [12/12] Updating package.json...

powershell -Command "
$packageJson = Get-Content 'package.json' | ConvertFrom-Json
if ($packageJson.scripts.postinstall) {
    $packageJson.scripts.PSObject.Properties.Remove('postinstall')
}
$packageJson.scripts.prisma = 'prisma'
$packageJson.scripts['db:generate'] = 'npx prisma generate'
$packageJson | ConvertTo-Json -Depth 10 | Set-Content 'package.json'
"

:: ============================================
:: FINAL: GENERATE PRISMA CLIENT
:: ============================================
echo.
echo [Bonus] Generating Prisma Client...
call npx prisma generate

:: ============================================
:: SUCCESS MESSAGE
:: ============================================
echo.
echo ============================================
echo MICROSERVICE CREATED SUCCESSFULLY!
echo ============================================
echo.
echo Name: %SERVICE_NAME%
echo Port: %SERVICE_PORT%
echo Database: %DB_NAME%
echo Location: %PROJECT_ROOT%\services\%SERVICE_NAME%
echo.
echo Next steps:
echo 1. Add to docker-compose.yml
echo 2. Add to nginx configuration
echo 3. Run: docker-compose up --build %SERVICE_NAME%
echo.
pause