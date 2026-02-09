import { TaxStrategy, TaxResult, TaxDetail } from './tax-strategy.interface';
import { TaxRuleEngine } from '../services/tax-rule.engine';

export class MxTaxStrategy implements TaxStrategy {
  constructor(private readonly taxRuleEngine: TaxRuleEngine) {}

  async calculate(amount: number): Promise<TaxResult> {
    const rules = await this.taxRuleEngine.getApplicableRules('MX');

    if (!rules || rules.length === 0) {
        // Fallback or throw error? For now fallback to 0 to avoid breaking if no rules seeded.
        return { totalTax: 0, details: [] };
    }

    let totalTax = 0;
    const details: TaxDetail[] = [];

    for (const rule of rules) {
        const rate = parseFloat(rule.rate);
        const taxAmount = amount * rate;
        totalTax += taxAmount;
        details.push({
            taxType: rule.taxType,
            rate: rate,
            amount: taxAmount
        });
    }

    return {
      totalTax,
      details
    };
  }
}
