import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { FiscalPeriod, type FiscalPeriodRepository } from '@virtex/domain-accounting-domain';

@Injectable()
export class MikroOrmFiscalPeriodRepository implements FiscalPeriodRepository {
  constructor(private readonly em: EntityManager) {}

  async create(period: FiscalPeriod): Promise<FiscalPeriod> {
    await this.em.persistAndFlush(period);
    return period;
  }

  async findById(tenantId: string, id: string): Promise<FiscalPeriod | null> {
    return this.em.findOne(FiscalPeriod, { tenantId, id });
  }

  async findByDate(tenantId: string, date: Date): Promise<FiscalPeriod | null> {
    return this.em.findOne(FiscalPeriod, {
      tenantId,
      startDate: { $lte: date },
      endDate: { $gte: date },
    });
  }

  async findAll(tenantId: string): Promise<FiscalPeriod[]> {
    return this.em.find(FiscalPeriod, { tenantId }, { orderBy: { startDate: 'DESC' } });
  }

  async save(period: FiscalPeriod): Promise<FiscalPeriod> {
    await this.em.persistAndFlush(period);
    return period;
  }
}
