import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * @deprecated This middleware is unsafe for RLS in pooled environments.
 * Use TenantRlsInterceptor instead which ensures transactional safety.
 */
@Injectable()
export class TenantRlsMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantRlsMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    // No-op. The RLS is now handled by TenantRlsInterceptor.
    // We keep this class to avoid breaking existing imports that might reference it,
    // but it should be removed in the future.
    if (process.env['NODE_ENV'] !== 'production') {
        this.logger.warn('TenantRlsMiddleware is deprecated and should be removed from usage. RLS is now handled by TenantRlsInterceptor.');
    }
    next();
  }
}
