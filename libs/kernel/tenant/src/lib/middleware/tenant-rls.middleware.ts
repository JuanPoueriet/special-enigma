import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EntityManager } from '@mikro-orm/core';
import { getTenantContext } from '@virteex-erp/auth';

@Injectable()
export class TenantRlsMiddleware implements NestMiddleware {
  constructor(private readonly em: EntityManager) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const context = getTenantContext();
    if (context && context.tenantId) {
      try {
        // Use parameterized query to prevent SQL Injection
        await this.em.execute('SET app.current_tenant = ?', [context.tenantId]);

        // Clean up on response finish to prevent connection pollution
        res.on('finish', async () => {
             try {
                 // We need to ensure we use the SAME connection if possible, or just reset generally.
                 // In a pooled environment, we can't guarantee we get the same connection here unless we are in a transaction
                 // or the EM pins it. Best effort reset.
                 await this.em.execute('RESET app.current_tenant');
             } catch (e) {
                 console.error('Failed to reset RLS context', e);
             }
        });
      } catch (error) {
        console.error('Failed to set RLS context', error);
      }
    }
    next();
  }
}
