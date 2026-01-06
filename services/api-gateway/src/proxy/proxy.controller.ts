/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, All, Req, Res, Get } from '@nestjs/common';
import express from 'express';
import { ProxyService } from './proxy.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Controller('api')
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Get('health')
  async getHealth(@Res() res: express.Response) {
    // Отправляем событие о health check
    await this.rabbitMQService.publishRequestEvent({
      type: 'HEALTH_CHECK',
      service: 'api-gateway',
      path: '/api/health',
      method: 'GET',
      statusCode: 200,
      timestamp: new Date().toISOString(),
      duration: 0,
    });

    return res.json({
      status: 'ok',
      service: 'api-gateway',
      timestamp: new Date().toISOString(),
      rabbitmq: 'connected',
    });
  }

  @All('*')
  async handleProxy(@Req() req: express.Request, @Res() res: express.Response) {
    const startTime = Date.now();

    // Определяем сервис по пути
    const serviceName = this.getServiceName(req.url);

    if (!serviceName) {
      const duration = Date.now() - startTime;
      await this.rabbitMQService.logRequest(req, res, duration);
      return res.status(404).json({ error: 'Service not found' });
    }

    try {
      // Проксируем запрос
      this.proxyService.proxyRequest(serviceName, req, res);

      const duration = Date.now() - startTime;

      // Логируем успешный запрос в RabbitMQ
      await this.rabbitMQService.logRequest(req, res, duration);
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`Proxy error to ${serviceName}:`, error);

      // Логируем ошибку в RabbitMQ
      await this.rabbitMQService.publishRequestEvent({
        type: 'PROXY_ERROR',
        service: serviceName,
        path: req.url,
        method: req.method,
        statusCode: 502,
        timestamp: new Date().toISOString(),
        duration,
        ip: req.ip,
      });

      if (!res.headersSent) {
        res.status(502).json({
          error: `${serviceName} service unavailable`,
          message: error.message,
        });
      }
    }
  }

  private getServiceName(url: string): string | null {
    if (url.startsWith('/api/auth')) return 'auth';
    if (url.startsWith('/api/users')) return 'users';
    if (url.startsWith('/api/reference')) return 'reference';
    if (url.startsWith('/api/admin')) return 'admin';
    // Добавь другие сервисы
    return null;
  }
}
