import { All, Controller, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { IdentityProxyService } from './identity-proxy.service';

@Controller()
export class IdentityProxyController {
  constructor(private readonly identityProxy: IdentityProxyService) {}

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

  private extractPath(req: Request): string {
    const routePrefix = '/api/portal/';
    const urlWithoutQuery = req.originalUrl.split('?')[0];
    const normalized = urlWithoutQuery.startsWith(routePrefix)
      ? urlWithoutQuery.slice(routePrefix.length)
      : urlWithoutQuery.replace(/^\/+/, '');

    return normalized;
  }
}
