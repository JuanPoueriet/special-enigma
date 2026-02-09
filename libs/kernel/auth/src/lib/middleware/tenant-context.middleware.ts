import { Injectable, NestMiddleware, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';
import { TenantContext } from '@virteex/auth/lib/interfaces/tenant-context.interface';
import { runWithTenantContext } from '@virteex/auth/lib/storage/tenant-context.storage';
import { TelemetryService } from '@virteex/telemetry';

@Injectable()
export class TenantContextMiddleware implements NestMiddleware, OnModuleInit {
  private readonly secret: string;

  constructor(private readonly telemetryService: TelemetryService) {
    // If not set, it will be undefined, validated in onModuleInit
    this.secret = process.env['VIRTEEX_HMAC_SECRET'] || '';
  }

  onModuleInit() {
    if (!this.secret) {
        throw new Error('FATAL: VIRTEEX_HMAC_SECRET is not defined. Application cannot start securely.');
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    const contextHeader = Array.isArray(req.headers['x-virteex-context'])
      ? req.headers['x-virteex-context'][0]
      : req.headers['x-virteex-context'];
    const signatureHeader = Array.isArray(req.headers['x-virteex-signature'])
      ? req.headers['x-virteex-signature'][0]
      : req.headers['x-virteex-signature'];

    if (!contextHeader || !signatureHeader) {
      this.telemetryService.recordSecurityEvent('MISSING_CONTEXT_HEADERS', {
        ip: req.ip,
        headers: req.headers,
      });
      throw new UnauthorizedException('Missing Tenant Context Headers');
    }

    const expectedSignature = createHmac('sha256', this.secret)
      .update(contextHeader)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature);
    const signatureBuffer = Buffer.from(signatureHeader);

    if (expectedBuffer.length !== signatureBuffer.length || !timingSafeEqual(expectedBuffer, signatureBuffer)) {
      this.telemetryService.recordSecurityEvent('INVALID_SIGNATURE', {
        ip: req.ip,
        headers: req.headers,
      });
      throw new UnauthorizedException('Invalid Tenant Context Signature');
    }

    try {
      const context: TenantContext = JSON.parse(Buffer.from(contextHeader, 'base64').toString('utf-8'));
      // Attach to request object. We might need to extend the Express Request interface for type safety globally,
      // but for now we attach it to 'user' or a custom property.
      // NestJS usually uses request['user'] for auth, but this is tenant context.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (req as any).tenantContext = context;

      // Add Telemetry attributes
      const requestId = (req.headers['x-request-id'] as string) || 'unknown';
      this.telemetryService.setTraceAttributes({
        'tenant.id': context.tenantId,
        'request.id': requestId,
      });

      runWithTenantContext(context, () => {
        next();
      });
    } catch {
      this.telemetryService.recordSecurityEvent('INVALID_CONTEXT_FORMAT', {
        ip: req.ip,
        headers: req.headers,
      });
      throw new UnauthorizedException('Invalid Tenant Context Format');
    }
  }
}
