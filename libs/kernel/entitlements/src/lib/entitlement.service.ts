import {
  Injectable,
  Inject,
  Optional,
  ForbiddenException,
} from '@nestjs/common';
import {
  SUBSCRIPTION_REPOSITORY,
  type SubscriptionRepository,
  PlanLimitMapper,
} from '@virteex/domain-subscription-domain';
import { getTenantContext } from '@virteex/kernel-auth';

export interface UsageProvider {
  getResource(): string;
  countUsage(tenantId: string, period: 'monthly' | 'lifetime'): Promise<number>;
}

@Injectable()
export class EntitlementService {
  private readonly usageProviders = new Map<string, UsageProvider>();

  constructor(
    @Optional()
    @Inject(SUBSCRIPTION_REPOSITORY)
    private readonly subscriptionRepository?: SubscriptionRepository,
  ) {}

  registerUsageProvider(provider: UsageProvider) {
    this.usageProviders.set(provider.getResource(), provider);
  }

  async isFeatureEnabled(entitlement: string): Promise<boolean> {
    const context = getTenantContext();
    if (!context?.tenantId) return false;
    if (!this.subscriptionRepository) return false;

    const subscription = await this.subscriptionRepository.findByTenantId(
      context.tenantId,
    );
    if (!subscription || !subscription.isValid()) return false;

    const plan = subscription.getPlan();
    if (!plan) return false;

    // Support capability:action:scope format
    // Simple inclusion check first for backward compatibility and basic features
    if (plan.features.includes(entitlement)) return true;

    // Advanced parsing for capability:action:scope
    const [capability, action, scope] = entitlement.split(':');

    return plan.features.some((f) => {
      const [fCap, fAct, fScope] = f.split(':');

      // Capability must match
      if (fCap !== capability) return false;

      // If no action requested or plan has wildcard action
      const actionMatches = !action || fAct === '*' || fAct === action;
      if (!actionMatches) return false;

      // If no scope requested or plan has wildcard scope
      const scopeMatches = !scope || fScope === '*' || fScope === scope;
      return scopeMatches;
    });
  }

  async checkQuota(resource: string, currentCount?: number): Promise<void> {
    const context = getTenantContext();
    if (!context?.tenantId) {
      throw new ForbiddenException('Tenant context required for quota check');
    }
    if (!this.subscriptionRepository) {
      throw new ForbiddenException(
        'Subscription repository unavailable for quota check',
      );
    }

    const subscription = await this.subscriptionRepository.findByTenantId(
      context.tenantId,
    );
    if (!subscription || !subscription.isValid()) {
      throw new ForbiddenException(
        'No active subscription found for quota check',
      );
    }

    const plan = subscription.getPlan();
    const structuredLimits = PlanLimitMapper.toStructuredLimits(plan?.limits || []);
    const limitConfig = structuredLimits[resource];

    // Deny by default: if resource is not in plan limits, assume limit 0
    const limit = limitConfig ? limitConfig.limit : 0;
    const period = (limitConfig ? limitConfig.period : 'lifetime') as 'monthly' | 'lifetime';

    if (limit === -1) return;

    let usage = currentCount;
    if (usage === undefined) {
      const provider = this.usageProviders.get(resource);
      if (!provider) {
        throw new ForbiddenException(
          `No usage provider registered for resource: ${resource} and no currentCount provided.`,
        );
      }
      usage = await provider.countUsage(context.tenantId, period);
    }

    if (usage >= limit) {
      const periodContext = period === 'monthly' ? ' (this month)' : ' (lifetime)';
      throw new ForbiddenException(
        `Quota exceeded for resource '${resource}'${periodContext}. Limit: ${limit}, Current Usage: ${usage}`,
      );
    }
  }
}
