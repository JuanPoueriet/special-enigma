import { PlanLimit } from '@virteex/domain-subscription-contracts';

export interface StructuredLimits {
  [key: string]: number;
}

export class PlanLimitMapper {
  static toStructuredLimits(limits: PlanLimit[]): StructuredLimits {
    const structured: StructuredLimits = {};

    limits.forEach(limit => {
      structured[limit.resource] = limit.limit;
    });

    return structured;
  }
}
