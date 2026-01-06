/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib';

export interface GatewayEvent {
  type: string;
  service: string;
  path: string;
  method: string;
  statusCode: number;
  timestamp: string;
  duration: number;
  ip?: string;
}

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection: Connection;
  private channel: Channel;
  private readonly GATEWAY_QUEUE = 'gateway.events';

  async onModuleInit() {
    await this.connect();
  }

  private async connect() {
    try {
      const url =
        process.env.RABBITMQ_URL || 'amqp://admin:admin123@rabbitmq:5672';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      this.connection = await connect(url);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.channel = await this.connection.createChannel();

      // Создаем очередь для событий шлюза
      await this.channel.assertQueue(this.GATEWAY_QUEUE, {
        durable: true,
      });

      console.log(`[Gateway RabbitMQ] Connected to ${url}`);
      console.log(`[Gateway RabbitMQ] Queue ready: ${this.GATEWAY_QUEUE}`);
    } catch (error) {
      console.error('[Gateway RabbitMQ] Connection error:', error.message);
    }
  }

  publishRequestEvent(event: GatewayEvent) {
    if (!this.channel) {
      console.warn('[Gateway RabbitMQ] Channel not ready, skipping event');
      return false;
    }

    try {
      const message = Buffer.from(JSON.stringify(event));
      const sent = this.channel.sendToQueue(this.GATEWAY_QUEUE, message, {
        persistent: true,
      });

      if (sent) {
        console.log(
          `[Gateway RabbitMQ] Event published: ${event.type} ${event.path} ${event.statusCode}`,
        );
      }

      return sent;
    } catch (error) {
      console.error('[Gateway RabbitMQ] Publish error:', error.message);
      return false;
    }
  }

  async logRequest(req: any, res: any, duration: number) {
    const event: GatewayEvent = {
      type: 'HTTP_REQUEST',
      service: 'api-gateway',
      path: req.url,
      method: req.method,
      statusCode: res.statusCode,
      timestamp: new Date().toISOString(),
      duration,
      ip: req.ip || req.connection?.remoteAddress,
    };

    await this.publishRequestEvent(event);
  }

  async broadcastToServices(
    event: any,
    routingKey: string = 'gateway.broadcast',
  ) {
    if (!this.channel) return false;

    try {
      const exchange = 'gateway_exchange';
      await this.channel.assertExchange(exchange, 'topic', { durable: true });

      const message = Buffer.from(
        JSON.stringify({
          ...event,
          from: 'api-gateway',
          timestamp: new Date().toISOString(),
        }),
      );

      return this.channel.publish(exchange, routingKey, message);
    } catch (error) {
      console.error('[Gateway RabbitMQ] Broadcast error:', error);
      return false;
    }
  }

  // Метод для отправки уведомлений о новых сервисах
  async notifyServiceRegistered(serviceName: string, port: number) {
    await this.broadcastToServices(
      {
        type: 'SERVICE_REGISTERED',
        serviceName,
        port,
        action: 'register',
      },
      'service.lifecycle',
    );
  }

  async notifyServiceHealth(serviceName: string, status: 'up' | 'down') {
    await this.broadcastToServices(
      {
        type: 'SERVICE_HEALTH',
        serviceName,
        status,
        timestamp: new Date().toISOString(),
      },
      'service.health',
    );
  }
}
