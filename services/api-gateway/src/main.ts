import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Включаем CORS
  const corsOrigins = configService
    .get<string>('CORS_ORIGINS', 'http://localhost:5173')
    .split(',');

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port, '0.0.0.0');

  const logger = new Logger('Bootstrap');
  logger.log(`API Gateway running on port ${port}`);

  // Логируем конфигурацию прокси
  logger.log('Proxy configuration:');
  logger.log(
    `  Auth: ${configService.get('AUTH_SERVICE_URL', 'http://localhost:3001')}`,
  );
  logger.log(
    `  Users: ${configService.get('USER_SERVICE_URL', 'http://localhost:3002')}`,
  );
  logger.log(
    `  Reference: ${configService.get('REFERENCE_SERVICE_URL', 'http://localhost:3010')}`,
  );
}

bootstrap();
