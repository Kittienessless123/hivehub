import { Controller, All, Req, Res, Get } from '@nestjs/common';
import express from 'express';
import { ProxyService } from './proxy.service';

@Controller('api')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('health')
  healthCheck(@Res() res: express.Response) {
    return res.json({
      status: 'ok',
      service: 'api-gateway',
      timestamp: new Date().toISOString(),
    });
  }

  // ПРАВИЛЬНЫЙ СИНТАКСИС ДЛЯ WILDCARD:
  @All('auth/*')
  proxyAuth(@Req() req: express.Request, @Res() res: express.Response) {
    const path = req.params[0] || ''; // Получаем wildcard параметр
    console.log(`Proxying to auth: ${path}`);
    this.proxyService.proxyRequest('auth', req, res);
  }

  @All('users/*')
  proxyUsers(@Req() req: express.Request, @Res() res: express.Response) {
    this.proxyService.proxyRequest('users', req, res);
  }

  @All('reference/*')
  proxyReference(@Req() req: express.Request, @Res() res: express.Response) {
    this.proxyService.proxyRequest('reference', req, res);
  }
}
