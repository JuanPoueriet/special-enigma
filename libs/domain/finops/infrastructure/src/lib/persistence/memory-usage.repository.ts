import { Injectable } from '@nestjs/common';
import { UsageAggregate, UsageRecord, UsageRepository } from '@virteex/domain-finops-domain';

@Injectable()
export class InMemoryUsageRepository implements UsageRepository {
  private records: UsageRecord[] = [];

  async recordUsage(record: UsageRecord): Promise<void> {
    this.records.push(record);
  }

  async getUsage(tenantId: string, startDate?: Date, endDate?: Date): Promise<UsageRecord[]> {
    return this.records.filter(r => {
      const matchTenant = r.tenantId === tenantId;
      const matchStart = startDate ? r.timestamp >= startDate : true;
      const matchEnd = endDate ? r.timestamp <= endDate : true;
      return matchTenant && matchStart && matchEnd;
    });
  }

  async aggregateUsage(tenantId: string, startDate: Date, endDate: Date): Promise<UsageAggregate[]> {
    const records = await this.getUsage(tenantId, startDate, endDate);
    const aggregates = new Map<UsageRecord['metric'], number>();

    for (const item of records) {
      aggregates.set(item.metric, (aggregates.get(item.metric) ?? 0) + item.value);
    }

    return [...aggregates.entries()].map(([metric, total]) => ({ metric, total }));
  }
}
