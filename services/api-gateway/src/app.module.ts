import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyModule } from './proxy/proxy.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [ProxyModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
