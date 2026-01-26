import { EventSubscriber, EntityName, EventArgs } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { getTenantContext } from '@virteex-erp/auth';
import { SampleEntity } from '@virteex-erp/domain';

@Injectable()
export class TenantSubscriber implements EventSubscriber<SampleEntity> {
  getSubscribedEntities(): EntityName<SampleEntity>[] {
    return [SampleEntity];
  }

  async beforeCreate(args: EventArgs<SampleEntity>): Promise<void> {
    const context = getTenantContext();
    if (context) {
      args.entity.tenantId = context.tenantId;
    }
  }
}
