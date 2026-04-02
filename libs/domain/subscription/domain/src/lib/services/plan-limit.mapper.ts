import { PlanLimit } from '@virtex/domain-subscription-contracts';

export interface StructuredLimit {
  limit: number;
  period: 'monthly' | 'lifetime';
}

export interface StructuredLimits {
  [key: string]: StructuredLimit;
}

export class PlanLimitMapper {
  static toStructuredLimits(limits: PlanLimit[]): StructuredLimits {
    const structured: StructuredLimits = {};

    limits.forEach(limit => {
      structured[limit.resource] = {
        limit: limit.limit,
        period: limit.period
      };
    });

    return structured;
  }
}
