import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Subscription } from '../../../../domain/src/lib/entities/subscription.entity';
import { SubscriptionRepository } from '../../../../domain/src/lib/ports/subscription.repository';

@Injectable()
export class MikroOrmSubscriptionRepository implements SubscriptionRepository {
  constructor(private readonly em: EntityManager) {}

  async findByTenantId(tenantId: string): Promise<Subscription | null> {
    return this.em.findOne(Subscription, { tenantId }, { populate: ['plan'] });
  }

  async save(subscription: Subscription): Promise<void> {
    await this.em.persistAndFlush(subscription);
  }
}
