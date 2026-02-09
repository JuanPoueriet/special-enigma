import { Injectable } from '@nestjs/common';
import { UsageRecord, UsageRepository } from '../ports/usage.repository';

@Injectable()
export class InMemoryUsageRepository implements UsageRepository {
  private readonly store: UsageRecord[] = [];

  constructor() {
    // Seed with some deterministic data for verification
    this.seedData();
  }

  private seedData() {
    const now = new Date();
    // Tenant A
    this.store.push({ tenantId: 'tenant-a', metric: 'compute', value: 100, timestamp: now });
    this.store.push({ tenantId: 'tenant-a', metric: 'storage', value: 50, timestamp: now });
    // Tenant B
    this.store.push({ tenantId: 'tenant-b', metric: 'compute', value: 200, timestamp: now });
  }

  async getUsage(tenantId: string, startDate: Date, endDate: Date): Promise<UsageRecord[]> {
    return this.store.filter(r =>
      r.tenantId === tenantId &&
      r.timestamp >= startDate &&
      r.timestamp <= endDate
    );
  }

  async recordUsage(record: UsageRecord): Promise<void> {
    this.store.push(record);
  }
}
