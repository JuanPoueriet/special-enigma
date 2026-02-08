import { Injectable, NestMiddleware } from '@nestjs/common';
import { EntityManager, RequestContext } from '@mikro-orm/core';
import { NextFunction, Request, Response } from 'express';
import { TenantContext } from '@virteex/auth';
import { TenantService, TenantMode } from '@virteex/tenant';

@Injectable()
export class TenantPersistenceMiddleware implements NestMiddleware {
  constructor(
    private readonly em: EntityManager,
    private readonly tenantService: TenantService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tenantContext = (req as any).tenantContext as TenantContext;
    const tenantId = tenantContext?.tenantId;

    if (tenantId) {
      const config = await this.tenantService.getTenantConfig(tenantId);

      if (config.mode === TenantMode.SHARED) {
        // SHARED mode: Execute SET command for RLS.
        // To be safe with connection pooling, this should ideally be done in a transaction or with strict session management.
        // For strict compliance with standards demanding DB-level RLS:
        await this.em.getConnection().execute('SET app.current_tenant = ?', [tenantId]);
        await this.em.getConnection().execute('SET search_path = public');
      } else if (config.mode === TenantMode.SCHEMA && config.schemaName) {
        // For schema mode, we fork the EM with the schema and create a new RequestContext.
        const scopedEm = this.em.fork({ schema: config.schemaName });
        RequestContext.create(scopedEm, next);
        return;
      }
    }

    next();
  }
}
