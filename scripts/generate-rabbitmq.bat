@echo off
chcp 65001 > nul

echo.
echo ===================================
echo GENERATE RABBITMQ MODULE
echo ===================================
echo.

echo Enter service name (e.g., user-service):
set /p SERVICE_NAME=

echo.
echo [1/5] Going to service directory...
cd /d "services\%SERVICE_NAME%"

echo [2/5] Generating RabbitMQ module...
call npx @nestjs/cli g module rabbitmq

echo [3/5] Generating RabbitMQ service...
call npx @nestjs/cli g service rabbitmq --no-spec

echo [4/5] Creating folder structure...
mkdir src\rabbitmq\interfaces 2>nul

echo [5/5] Creating constants and interfaces...

:: Создаем константы
(
echo export const RABBITMQ_CONSTANTS = {
echo   QUEUES: {
echo     %SERVICE_NAME:~0,4%_EVENTS: '%SERVICE_NAME%.events',
echo   },
echo   EXCHANGES: {
echo     DIRECT: 'direct_exchange',
echo     TOPIC: 'topic_exchange',
echo     FANOUT: 'fanout_exchange',
echo   },
echo   EVENTS: {
echo     TEST_EVENT: 'TEST_EVENT',
echo     HEALTH_CHECK: 'HEALTH_CHECK',
echo     USER_CREATED: 'USER_CREATED',
echo     TASK_CREATED: 'TASK_CREATED',
echo   },
echo } as const;
) > src\rabbitmq\rabbitmq.constants.ts

:: Создаем интерфейсы
(
echo export interface BaseEvent {
echo   type: string;
echo   service: string;
echo   timestamp: string;
echo   data?: any;
echo }
echo.
echo export interface UserCreatedEvent extends BaseEvent {
echo   type: 'USER_CREATED';
echo   data: {
echo     userId: string;
echo     email: string;
echo     username?: string;
echo   };
echo }
echo.
echo export interface TaskCreatedEvent extends BaseEvent {
echo   type: 'TASK_CREATED';
echo   data: {
echo     taskId: string;
echo     projectId: string;
echo     title: string;
echo   };
echo }
) > src\rabbitmq\interfaces\event.interface.ts

echo.
echo RabbitMQ module generated successfully!
echo Location: services/%SERVICE_NAME%/src/rabbitmq/
echo.
pause