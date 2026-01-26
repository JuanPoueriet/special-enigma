import { Injectable } from '@nestjs/common';
import { TaxStrategy, TaxResult } from '../strategies/tax-strategy.interface';
import { MxTaxStrategy } from '../strategies/mx-tax.strategy';
import { BrTaxStrategy } from '../strategies/br-tax.strategy';

@Injectable()
export class TaxCalculatorService {
  private strategies: Map<string, TaxStrategy> = new Map();

  constructor() {
    this.strategies.set('MX', new MxTaxStrategy());
    this.strategies.set('BR', new BrTaxStrategy());
  }

  calculateTax(amount: number, jurisdiction: string): TaxResult {
    const strategy = this.strategies.get(jurisdiction);

    if (!strategy) {
       // Return zero tax if no strategy found
       return { totalTax: 0, details: [] };
    }

    return strategy.calculate(amount);
  }
}
