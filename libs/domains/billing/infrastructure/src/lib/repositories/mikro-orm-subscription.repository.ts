import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { ISubscriptionRepository, Subscription } from '@virteex/billing-domain';

@Injectable()
export class MikroOrmSubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly em: EntityManager) {}

  async save(subscription: Subscription): Promise<void> {
    await this.em.persistAndFlush(subscription);
  }

  async findByTenantId(tenantId: string): Promise<Subscription | null> {
    return this.em.findOne(Subscription, { tenantId });
  }
}
