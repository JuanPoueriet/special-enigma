import { TaxStrategy, TaxResult } from './tax-strategy.interface';

export class MxTaxStrategy implements TaxStrategy {
  calculate(amount: number): TaxResult {
    const rate = 0.16;
    const taxAmount = amount * rate;

    return {
      totalTax: taxAmount,
      details: [
        {
          taxType: 'IVA',
          rate: rate,
          amount: taxAmount
        }
      ]
    };
  }
}
