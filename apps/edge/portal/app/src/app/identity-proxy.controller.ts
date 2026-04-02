import { All, Controller, Req, Res, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import { IdentityProxyService } from './identity-proxy.service';

@Controller('v1')
export class IdentityProxyController {
  private readonly logger = new Logger(IdentityProxyController.name);
  constructor(private readonly identityProxy: IdentityProxyService) {}

  @All('auth/me')
  async getMe(@Req() req: Request, @Res() res: Response): Promise<void> {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      // Aggregate data from multiple sources (BFF pattern)
      const [user, preferences] = await Promise.all([
        this.identityProxy.getMeGrpc(token),
        this.fetchMockPreferences(token),
      ]);

      res.json({
        ...(user as any),
        preferences,
        bff_aggregated: true,
        timestamp: new Date().toISOString(),
      });
      return;
    }
    await this.identityProxy.forward(req, res, this.extractPath(req));
  }

  private async fetchMockPreferences(token: string) {
    // In a real scenario, this would call another service via gRPC or HTTP
    return {
      theme: 'dark',
      language: 'es',
      notifications: true,
    };
  }

  @All('auth/*path')
  @All('auth')
  async auth(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.identityProxy.forward(req, res, this.extractPath(req));
  }

  @All('localization/*path')
  @All('localization')
  async localization(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.identityProxy.forward(req, res, this.extractPath(req));
  }

  @All('common/*path')
  @All('common')
  async common(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.identityProxy.forward(req, res, this.extractPath(req));
  }

  @All('users/*path')
  @All('users')
  async users(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.identityProxy.forward(req, res, this.extractPath(req));
  }

  @All('admin/*path')
  @All('admin')
  async admin(@Req() req: Request, @Res() res: Response): Promise<void> {
    await this.identityProxy.forward(req, res, this.extractPath(req));
  }

  private extractPath(req: Request): string {
    const routePrefix = '/api/v1/';
    const urlWithoutQuery = req.originalUrl.split('?')[0];
    const normalized = urlWithoutQuery.startsWith(routePrefix)
      ? urlWithoutQuery.slice(routePrefix.length)
      : urlWithoutQuery.replace(/^\/+/, '');

    return normalized;
  }
}
