import { Injectable, Inject } from '@nestjs/common';
import { USAGE_REPOSITORY, UsageRepository } from '@virteex/finops/lib/ports/usage.repository';

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
  constructor(
    @Inject(USAGE_REPOSITORY) private readonly usageRepo: UsageRepository
  ) {}

  private get pricing() {
    return {
      compute: Number(process.env['PRICING_COMPUTE_RATE']) || 0.05,
      storage: Number(process.env['PRICING_STORAGE_RATE']) || 0.02,
      database: Number(process.env['PRICING_DATABASE_RATE']) || 0.10,
      network: Number(process.env['PRICING_NETWORK_RATE']) || 0.01
    };
  }

  async calculateTenantCost(tenantId: string, period = new Date().toISOString()): Promise<TenantCost> {
    // Determine period range (e.g., last 30 days or specific month)
    const endDate = new Date(period);
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 1);

    // 1. Telemetry / Usage Retrieval from Repository
    const usageRecords = await this.usageRepo.getUsage(tenantId, startDate, endDate);

    // 2. Aggregate Usage
    const totals: Record<string, number> = {
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
    const currentPricing = this.pricing;
    const computeCost = totals['compute'] * currentPricing.compute;
    const storageCost = totals['storage'] * currentPricing.storage;
    const databaseCost = totals['database'] * currentPricing.database;
    const networkCost = totals['network'] * currentPricing.network;

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
