import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [HealthModule, RabbitmqModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
