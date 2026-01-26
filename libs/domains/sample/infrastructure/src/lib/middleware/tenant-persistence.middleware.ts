import { Injectable, NestMiddleware } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { NextFunction, Request, Response } from 'express';
import { TenantContext } from '@virteex-erp/auth';

@Injectable()
export class TenantPersistenceMiddleware implements NestMiddleware {
  constructor(private readonly em: EntityManager) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tenantContext = (req as any).tenantContext as TenantContext;
    const tenantId = tenantContext?.tenantId;

    if (tenantId) {
      // Execute SET command.
      // We set the session variable for the current connection.
      // This ensures that RLS policies using current_setting('app.current_tenant') work for both Reads and Writes.
      await this.em.execute('SET app.current_tenant = ?', [tenantId]);
    }

    next();
  }
}
