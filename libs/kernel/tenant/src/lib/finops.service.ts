import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class FinOpsService {
  private readonly logger = new Logger(FinOpsService.name);

  constructor(private readonly telemetry: any) {}

  async recordResourceUsage(
    tenantId: string,
    mode: string,
    region: string,
    resource: 'cpu' | 'storage' | 'iops',
    amount: number
  ): Promise<void> {
    this.logger.log(`Recording high-precision resource usage for tenant ${tenantId}: ${amount} ${resource}`);

    // Production Unit Costs (Enterprise Grade)
    const rates = {
      cpu: 0.045,    // Optimized compute rate
      storage: 0.08,  // Multi-AZ storage rate
      iops: 0.008,    // High-performance IOPS rate
    };

    const multipliers = {
      SHARED: 1.0,
      SCHEMA: 1.15,
      DATABASE: 1.45,
    };

    const baseRate = rates[resource];
    const multiplier = multipliers[mode as keyof typeof multipliers] || 1.0;

    // Accurate attribution logic
    const observationCost = amount * baseRate * multiplier;

    this.telemetry.recordBusinessMetric('tenant_resource_cost_observed_usd', observationCost, {
      tenantId,
      mode,
      region,
      resource,
      accuracy: 'high-precision'
    });

    // Record cost metric (Legacy/Compatibility)
    this.telemetry.recordBusinessMetric('tenant_estimated_cost_usd', observationCost, {
      tenantId,
      mode,
      region,
    });

    // Record consumption metric
    this.telemetry.recordBusinessMetric('tenant_resource_consumption', amount, {
      tenantId,
      mode,
      region,
      resource,
    });

    await this.evaluateModeOptimization(tenantId, mode, observationCost);
  }

  private async evaluateModeOptimization(tenantId: string, currentMode: string, currentCost: number): Promise<void> {
      const thresholds = {
          SHARED: 50.0,   // If cost > 50 USD/mo in SHARED, recommend SCHEMA
          SCHEMA: 500.0,  // If cost > 500 USD/mo in SCHEMA, recommend DATABASE
      };

      const limit = thresholds[currentMode as keyof typeof thresholds];
      if (limit && currentCost > limit) {
          this.logger.warn(`FINOPS ADVISORY: Tenant ${tenantId} cost (${currentCost}) exceeds ${currentMode} threshold. Optimization required.`);
          this.telemetry.recordBusinessMetric('tenant_mode_optimization_recommendation', 1, {
              tenantId,
              currentMode,
              recommendedMode: currentMode === 'SHARED' ? 'SCHEMA' : 'DATABASE',
              reason: 'cost_efficiency'
          });
      }
  }
}
