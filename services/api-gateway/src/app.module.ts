import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProxyController } from './proxy/proxy.controller';
import { ProxyService } from './proxy/proxy.service';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RabbitMQModule,
  ],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class AppModule {}
