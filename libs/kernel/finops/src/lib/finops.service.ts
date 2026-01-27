import { Injectable } from '@nestjs/common';

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
  // Pricing Model (Mocked)
  private readonly PRICING = {
    computePerHour: 0.05,
    storagePerGB: 0.02,
    databasePerGB: 0.10,
    networkPerGB: 0.01
  };

  async calculateTenantCost(tenantId: string, period = new Date().toISOString()): Promise<TenantCost> {
    // 1. Telemetry / Usage Retrieval
    // In a real system, this would query Prometheus, CloudWatch, or a Usage Ledger DB.
    // Here we simulate usage data based on tenant ID hash or random.
    const usage = await this.getMockUsage(tenantId);

    // 2. Cost Calculation
    const computeCost = usage.computeHours * this.PRICING.computePerHour;
    const storageCost = usage.storageGB * this.PRICING.storagePerGB;
    const databaseCost = usage.databaseGB * this.PRICING.databasePerGB;
    const networkCost = usage.networkGB * this.PRICING.networkPerGB;

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

  private async getMockUsage(tenantId: string) {
    // Deterministic mock based on tenantId
    const seed = tenantId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return {
      computeHours: (seed % 720) + 1, // 1 to 720 hours
      storageGB: (seed % 1000) + 10,
      databaseGB: (seed % 500) + 5,
      networkGB: (seed % 5000) + 100
    };
  }
}
