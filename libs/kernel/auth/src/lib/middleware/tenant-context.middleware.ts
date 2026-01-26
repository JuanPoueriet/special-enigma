import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createHmac } from 'crypto';
import { TenantContext } from '../interfaces/tenant-context.interface';
import { runWithTenantContext } from '../storage/tenant-context.storage';

@Injectable()
export class TenantContextMiddleware implements NestMiddleware {
  private readonly secret = process.env['VIRTEEX_HMAC_SECRET'] || 'dev-secret';

  use(req: Request, res: Response, next: NextFunction) {
    const contextHeader = Array.isArray(req.headers['x-virteex-context'])
      ? req.headers['x-virteex-context'][0]
      : req.headers['x-virteex-context'];
    const signatureHeader = Array.isArray(req.headers['x-virteex-signature'])
      ? req.headers['x-virteex-signature'][0]
      : req.headers['x-virteex-signature'];

    if (!contextHeader || !signatureHeader) {
      // In development we might want to allow missing headers if configured, but for now strictly enforce.
      // But for the purpose of "scaffolding" where we might not have the gateway yet,
      // we might want a bypass or a mock.
      // Strict implementation as per requirements:
      throw new UnauthorizedException('Missing Tenant Context Headers');
    }

    const expectedSignature = createHmac('sha256', this.secret)
      .update(contextHeader)
      .digest('hex');

    if (expectedSignature !== signatureHeader) {
      throw new UnauthorizedException('Invalid Tenant Context Signature');
    }

    try {
      const context: TenantContext = JSON.parse(Buffer.from(contextHeader, 'base64').toString('utf-8'));
      // Attach to request object. We might need to extend the Express Request interface for type safety globally,
      // but for now we attach it to 'user' or a custom property.
      // NestJS usually uses request['user'] for auth, but this is tenant context.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any).tenantContext = context;

      runWithTenantContext(context, () => {
        next();
      });
    } catch {
       throw new UnauthorizedException('Invalid Tenant Context Format');
    }
  }
}
