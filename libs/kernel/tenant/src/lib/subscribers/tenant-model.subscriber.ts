import { EventSubscriber, EntityName, EventArgs, Subscriber } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { getTenantContext } from '@virteex/auth';

@Injectable()
@Subscriber()
export class TenantModelSubscriber implements EventSubscriber {
  // Subscribe to all entities? Or maybe we can't easily subscribe to "All" without listing them.
  // MikroORM allows subscribing to specific entities.
  // Ideally, entities implementing a 'TenantAware' interface.
  // For now, I'll make it generic or check property existence dynamically.

  async beforeCreate(args: EventArgs<any>): Promise<void> {
    const context = getTenantContext();
    if (context && context.tenantId) {
      if ('tenantId' in args.entity) {
        args.entity.tenantId = context.tenantId;
      }
    }
  }
}
