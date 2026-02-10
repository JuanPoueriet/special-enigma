import { Injectable, Inject } from '@nestjs/common';
import { TaxService } from '@virteex/payroll-domain';
import { TaxTableRepository } from '@virteex/payroll-domain/lib/repositories/tax-table.repository';
import { Decimal } from 'decimal.js';

@Injectable()
export class MexicanTaxService implements TaxService {
  constructor(
    @Inject('TaxTableRepository')
    private readonly repository: TaxTableRepository,
  ) {}

  async calculateTax(taxableIncome: number): Promise<number> {
    const income = new Decimal(taxableIncome);

    if (income.lessThanOrEqualTo(0)) {
      return 0;
    }

    // Default to 2024 Monthly tables for now, could be dynamic
    const tables = await this.repository.findForYear(2024, 'MONTHLY');
    if (!tables.length) {
      // Fallback or throw? For now return 0 but log warning
      console.warn('No tax tables found for 2024');
      return 0;
    }

    // Tables are sorted DESC by limit
    // Find the first row where income >= limit
    let row = tables[tables.length - 1]; // Default to lowest bracket
    for (const table of tables) {
      if (income.greaterThanOrEqualTo(table.limit)) {
        row = table;
        break;
      }
    }

    const excess = income.minus(row.limit);
    const taxOnExcess = excess.times(row.percent).dividedBy(100);
    const totalTax = taxOnExcess.plus(row.fixed);

    return totalTax.toDecimalPlaces(2).toNumber();
  }
}
