import { Injectable } from '@nestjs/common';
import { TaxService } from '@virteex/payroll-domain';
import { Decimal } from 'decimal.js';

@Injectable()
export class MexicanTaxService implements TaxService {
  // 2024 Monthly ISR Table (Standard)
  private readonly taxTable = [
    { limit: 0.01, fixed: 0.00, percent: 1.92 },
    { limit: 746.05, fixed: 14.32, percent: 6.40 },
    { limit: 6332.06, fixed: 371.83, percent: 10.88 },
    { limit: 11128.02, fixed: 893.63, percent: 16.00 },
    { limit: 12935.83, fixed: 1182.88, percent: 17.92 },
    { limit: 15487.72, fixed: 1640.18, percent: 21.36 },
    { limit: 31236.46, fixed: 5004.12, percent: 23.52 },
    { limit: 49233.01, fixed: 9236.89, percent: 30.00 },
    { limit: 93993.91, fixed: 22665.17, percent: 32.00 },
    { limit: 125325.21, fixed: 32691.18, percent: 34.00 },
    { limit: 375975.62, fixed: 117912.32, percent: 35.00 },
  ];

  async calculateTax(taxableIncome: number): Promise<number> {
    const income = new Decimal(taxableIncome);

    if (income.lessThanOrEqualTo(0)) {
        return 0;
    }

    // Find the corresponding row
    let row = this.taxTable[0];
    for (let i = this.taxTable.length - 1; i >= 0; i--) {
      if (income.greaterThanOrEqualTo(this.taxTable[i].limit)) {
        row = this.taxTable[i];
        break;
      }
    }

    const excess = income.minus(row.limit);
    const taxOnExcess = excess.times(row.percent).dividedBy(100);
    const totalTax = taxOnExcess.plus(row.fixed);

    // Return rounded to 2 decimals
    return totalTax.toDecimalPlaces(2).toNumber();
  }
}
