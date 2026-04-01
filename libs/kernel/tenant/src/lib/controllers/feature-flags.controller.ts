import { Controller, Get, UseGuards, Inject, Optional } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virteex/kernel-auth';
import { EntitlementService } from '@virteex/kernel-entitlements';
import { SUBSCRIPTION_PLAN_REPOSITORY, type SubscriptionPlanRepository } from '@virteex/domain-subscription-domain';

@ApiTags('Tenant')
@Controller('tenant/feature-flags')
@UseGuards(JwtAuthGuard, TenantGuard)
export class FeatureFlagsController {
  constructor(
    private readonly entitlementService: EntitlementService,
    @Optional()
    @Inject(SUBSCRIPTION_PLAN_REPOSITORY)
    private readonly planRepository?: SubscriptionPlanRepository
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get feature flags for the current tenant' })
  async getFeatureFlags(@CurrentTenant() tenantId: string) {
    // Dynamically resolve features from all available plans to build a complete flag set
    // In a production environment, this catalog might be cached or come from a config service
    let features: string[] = ['invoices', 'users', 'storage', 'branches', 'advanced-reports', 'treasury', 'payroll', 'fiscal'];

    if (this.planRepository) {
        const plans = await this.planRepository.findAll();
        const allFeatures = new Set<string>(features);
        plans.forEach(plan => {
            plan.features.forEach(f => {
                const [capability] = f.split(':');
                allFeatures.add(capability);
            });
        });
        features = Array.from(allFeatures);
    }

    const results = await Promise.all(
        features.map(f => this.entitlementService.isFeatureEnabled(f))
    );

    const flags: Record<string, boolean> = {};
    features.forEach((f, i) => {
        flags[f] = results[i];
    });

    return flags;
  }
}
