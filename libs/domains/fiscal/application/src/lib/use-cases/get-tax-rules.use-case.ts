import { Injectable, Inject } from '@nestjs/common';
import { TaxRuleRepository, TAX_RULE_REPOSITORY } from '@virteex/fiscal-domain';

@Injectable()
export class GetTaxRulesUseCase {
  constructor(
    @Inject(TAX_RULE_REPOSITORY) private readonly taxRuleRepository: TaxRuleRepository
  ) {}

  async execute(tenantId: string) {
    let rules = await this.taxRuleRepository.findAll(tenantId);

    if (!rules || rules.length === 0) {
      rules = await this.taxRuleRepository.createDefaultRules(tenantId);
    }

    return rules.map(r => ({
      id: r.id,
      name: r.name,
      rate: Number(r.rate),
      type: r.type,
      appliesTo: r.appliesTo
    }));
  }
}
