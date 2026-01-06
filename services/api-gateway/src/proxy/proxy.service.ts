import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as http from 'http';
import * as https from 'https';

@Injectable()
export class ProxyService {
  constructor(private configService: ConfigService) {}

  private getServiceUrl(serviceName: string): string {
    return this.configService.get(
      `${serviceName.toUpperCase()}_SERVICE_URL`,
      `http://${serviceName}-service:${this.getDefaultPort(serviceName)}`,
    );
  }

  private getDefaultPort(serviceName: string): number {
    const ports: Record<string, number> = {
      auth: 3001,
      users: 3002,
      reference: 3010,
    };
    return ports[serviceName] || 3000;
  }

  proxyRequest(serviceName: string, req: any, res: any) {
    const serviceUrl = this.getServiceUrl(serviceName);

    const url = new URL(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      serviceUrl + req.originalUrl.replace(`/api/${serviceName}`, ''),
    );
    const isHttps = url.protocol === 'https:';
    const httpModule = isHttps ? https : http;

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      method: req.method,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      headers: { ...req.headers },
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    delete options.headers['host'];

    const proxyReq = httpModule.request(options, (proxyRes) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      res.status(proxyRes.statusCode || 200);

      Object.keys(proxyRes.headers).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        res.setHeader(key, proxyRes.headers[key] as string);
      });

      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.error(`Proxy error to ${serviceName}:`, err.message);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!res.headersSent) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        res.status(502).json({
          error: `Cannot connect to ${serviceName} service`,
        });
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      proxyReq.write(JSON.stringify(req.body));
    }

    proxyReq.end();
  }
}
