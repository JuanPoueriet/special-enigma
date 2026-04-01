import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';

@Injectable()
export class IdentityProxyService {
  private readonly logger = new Logger(IdentityProxyService.name);
  private readonly identityBaseUrl =
    process.env['IDENTITY_SERVICE_URL'] ||
    'http://localhost:3000/api/identity-service';

  constructor(private readonly httpService: HttpService) {}

  async forward(req: Request, res: Response, path: string): Promise<void> {
    const targetUrl = `${this.identityBaseUrl}/${path.replace(/^\/+/, '')}`;

    try {
      this.logger.debug(`Forwarding ${req.method} ${req.originalUrl} to ${targetUrl}`);
      const response = await this.httpService.axiosRef.request({
        url: targetUrl,
        method: req.method as any,
        params: req.query,
        data: req.body,
        headers: {
          cookie: req.headers.cookie,
          authorization: req.headers.authorization,
          'content-type': req.headers['content-type'],
          'x-forwarded-for': req.headers['x-forwarded-for'] || req.ip,
          'x-request-id': req.headers['x-request-id'] as string | undefined,
        },
        validateStatus: () => true,
      });

      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader) {
        res.setHeader('set-cookie', setCookieHeader);
      }

      res.status(response.status);
      if (req.method.toUpperCase() === 'HEAD' || response.status === 204) {
        res.send();
        return;
      }

      res.send(response.data);
    } catch (error: any) {
      this.logger.error(
        `Proxy failed for ${req.method} ${path}`,
        error?.stack || error,
      );
      throw new HttpException('Identity service unavailable', 503);
    }
  }
}
