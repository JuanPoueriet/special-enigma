import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { ClosingTask, type ClosingTaskRepository } from '@virtex/domain-accounting-domain';

@Injectable()
export class MikroOrmClosingTaskRepository implements ClosingTaskRepository {
  constructor(private readonly em: EntityManager) {}

  async create(task: ClosingTask): Promise<ClosingTask> {
    await this.em.persistAndFlush(task);
    return task;
  }

  async findById(tenantId: string, id: string): Promise<ClosingTask | null> {
    return this.em.findOne(ClosingTask, { tenantId, id });
  }

  async findByFiscalPeriod(tenantId: string, fiscalPeriodId: string): Promise<ClosingTask[]> {
    return this.em.find(ClosingTask, { tenantId, fiscalPeriodId });
  }

  async save(task: ClosingTask): Promise<ClosingTask> {
    await this.em.persistAndFlush(task);
    return task;
  }
}
