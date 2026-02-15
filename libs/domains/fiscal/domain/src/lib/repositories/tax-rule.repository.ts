import { TaxRule } from '../entities/tax-rule.entity';

export const TAX_RULE_REPOSITORY = 'TAX_RULE_REPOSITORY';

export interface TaxRuleRepository {
  findAll(tenantId: string): Promise<TaxRule[]>;
  save(rule: TaxRule): Promise<void>;
  createDefaultRules(tenantId: string): Promise<TaxRule[]>;
}
