import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { type IdempotencyRepository, type IdempotencyRecord } from '@virteex/domain-accounting-domain';
import { IdempotencySchema } from '../orm/idempotency.schema';

@Injectable()
export class MikroOrmIdempotencyRepository implements IdempotencyRepository {
  constructor(private readonly em: EntityManager) {}

  async save(record: IdempotencyRecord): Promise<void> {
    const fork = this.em.fork();
    const entity = fork.create(IdempotencySchema, record);
    await fork.persistAndFlush(entity);
  }

  async findByKey(tenantId: string, idempotencyKey: string): Promise<IdempotencyRecord | null> {
    return this.em.findOne(IdempotencySchema, { tenantId, idempotencyKey });
  }
}
