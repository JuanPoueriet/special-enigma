import { TaxStrategy, TaxResult } from '@virteex/billing-domain/lib/strategies/tax-strategy.interface';

export class BrTaxStrategy implements TaxStrategy {
  async calculate(amount: number): Promise<TaxResult> {
    // Brazil taxes are complex and depend on state/product.
    // This is a structured example demonstrating capability for multiple taxes.

    const icmsRate = 0.18; // ICMS standard (varies by state)
    const ipiRate = 0.05;  // IPI (varies by product)

    const icmsAmount = amount * icmsRate;
    const ipiAmount = amount * ipiRate;

    return {
      totalTax: icmsAmount + ipiAmount,
      details: [
        {
          taxType: 'ICMS',
          rate: icmsRate,
          amount: icmsAmount
        },
        {
          taxType: 'IPI',
          rate: ipiRate,
          amount: ipiAmount
        }
      ]
    };
  }
}
