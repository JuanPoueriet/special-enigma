import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { FinancialReportSnapshot, type FinancialReportSnapshotRepository } from '@virteex/domain-accounting-domain';

@Injectable()
export class MikroOrmFinancialReportSnapshotRepository implements FinancialReportSnapshotRepository {
  constructor(private readonly em: EntityManager) {}

  async create(snapshot: FinancialReportSnapshot): Promise<FinancialReportSnapshot> {
    await this.em.persistAndFlush(snapshot);
    return snapshot;
  }

  async findLatest(tenantId: string, type: string, endDate: Date): Promise<FinancialReportSnapshot | null> {
    return this.em.findOne(FinancialReportSnapshot, { tenantId, type, endDate }, { orderBy: { version: 'DESC' } });
  }

  async findByTenant(tenantId: string): Promise<FinancialReportSnapshot[]> {
    return this.em.find(FinancialReportSnapshot, { tenantId }, { orderBy: { generatedAt: 'DESC' } });
  }
}
