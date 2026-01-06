import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // GET / (корень)
  @Get()
  getHello() {
    return {
      message: 'HiveHub API Gateway',
      version: '1.0.0',
      endpoints: {
        auth: '/auth/*',
        /*   users: '/users/*',
        reference: '/reference/*', */
      },
    };
  }

  // GET /health
  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'api-gateway',
      timestamp: new Date().toISOString(),
      upstream: {
        auth: 'http://localhost:3001',
        // users: 'http://localhost:3002',
        // reference: 'http://localhost:3010',
      },
    };
  }
}
