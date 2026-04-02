import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import type { Request, Response } from 'express';
import axiosRetry from 'axios-retry';
import { firstValueFrom } from 'rxjs';

interface IdentityService {
  getMe(data: { access_token: string }): any;
  login(data: any): any;
}

@Injectable()
export class IdentityProxyService implements OnModuleInit {
  private readonly logger = new Logger(IdentityProxyService.name);
  private readonly identityBaseUrl =
    process.env['IDENTITY_SERVICE_URL'] ||
    'http://localhost:3000/api/identity-service';

  private identityService: IdentityService;

  constructor(
    private readonly httpService: HttpService,
    @Inject('IDENTITY_PACKAGE') private client: ClientGrpc,
  ) {
    // Configure axios-retry for resilient communication
    axiosRetry(this.httpService.axiosRef, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) => {
        return (
          axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          (error.response?.status ? error.response.status >= 500 : false)
        );
      },
      onRetry: (retryCount, error, requestConfig) => {
        this.logger.warn(
          `Retrying request to ${requestConfig.url} (Attempt ${retryCount}). Reason: ${error.message}`,
        );
      },
    });
  }

  async checkConnectivity(): Promise<{ status: string; url: string }> {
    try {
      await this.httpService.axiosRef.head(this.identityBaseUrl, {
        timeout: 2000,
      });
      return { status: 'up', url: this.identityBaseUrl };
    } catch (error: any) {
      this.logger.error(`Identity service connectivity check failed at ${this.identityBaseUrl}: ${error.message}`);
      return { status: 'down', url: this.identityBaseUrl };
    }
  }

  onModuleInit() {
    this.identityService = this.client.getService<IdentityService>('IdentityService');
  }

  async getMeGrpc(accessToken: string) {
    try {
      return await firstValueFrom(this.identityService.getMe({ access_token: accessToken }));
    } catch (e) {
      this.logger.error('gRPC getMe failed', e);
      throw e;
    }
  }

  async loginGrpc(data: any) {
    try {
      return await firstValueFrom(this.identityService.login(data));
    } catch (e) {
      this.logger.error('gRPC login failed', e);
      throw e;
    }
  }

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
          'user-agent': req.headers['user-agent'],
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
      const status = error.response?.status || 503;
      const message = error.response?.data?.message || 'Identity service unavailable';

      this.logger.error(
        `Proxy failed for ${req.method} ${path} at ${targetUrl}. Status: ${status}`,
        error?.stack || error,
      );

      throw new HttpException(
        {
          statusCode: status,
          message: message,
          error: 'Bad Gateway',
          path: req.originalUrl,
          targetUrl: process.env.NODE_ENV === 'development' ? targetUrl : undefined,
        },
        status
      );
    }
  }
}
