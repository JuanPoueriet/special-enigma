import { Injectable, Inject } from '@nestjs/common';
import { USAGE_REPOSITORY, UsageRepository } from './ports/usage.repository';

export interface CostBreakdown {
  compute: number;
  storage: number;
  database: number;
  network: number;
  total: number;
  currency: string;
}

export interface TenantCost {
  tenantId: string;
  period: string; // ISO 8601 Date
  breakdown: CostBreakdown;
}

@Injectable()
export class FinOpsService {
  // Pricing Model (Configurable in future)
  private readonly PRICING = {
    compute: 0.05,  // per hour
    storage: 0.02,  // per GB
    database: 0.10, // per GB
    network: 0.01   // per GB
  };

  constructor(
    @Inject(USAGE_REPOSITORY) private readonly usageRepo: UsageRepository
  ) {}

  async calculateTenantCost(tenantId: string, period = new Date().toISOString()): Promise<TenantCost> {
    // Determine period range (e.g., last 30 days or specific month)
    // For simplicity, we fetch "all time" or a fixed window based on the period date
    const endDate = new Date(period);
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 1);

    // 1. Telemetry / Usage Retrieval from Repository
    const usageRecords = await this.usageRepo.getUsage(tenantId, startDate, endDate);

    // 2. Aggregate Usage
    const totals = {
      compute: 0,
      storage: 0,
      database: 0,
      network: 0
    };

    for (const record of usageRecords) {
      if (totals[record.metric] !== undefined) {
        totals[record.metric] += record.value;
      }
    }

    // 3. Cost Calculation
    const computeCost = totals.compute * this.PRICING.compute;
    const storageCost = totals.storage * this.PRICING.storage;
    const databaseCost = totals.database * this.PRICING.database;
    const networkCost = totals.network * this.PRICING.network;

    const total = computeCost + storageCost + databaseCost + networkCost;

    return {
      tenantId,
      period,
      breakdown: {
        compute: Number(computeCost.toFixed(4)),
        storage: Number(storageCost.toFixed(4)),
        database: Number(databaseCost.toFixed(4)),
        network: Number(networkCost.toFixed(4)),
        total: Number(total.toFixed(2)),
        currency: 'USD'
      }
    };
  }
}
