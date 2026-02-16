import { Injectable, Inject, Logger } from '@nestjs/common';
import { TaxService, TaxTableRepository, MissingTaxTableException, TAX_TABLE_REPOSITORY, TaxTable, PayrollTaxesResult } from '@virteex/payroll-domain';
import { Decimal } from 'decimal.js';

const DEFAULT_UMA = 108.57; // 2024
const IMSS_BASE_RATE = 0.02375;
const IMSS_EXCESS_RATE = 0.004;

@Injectable()
export class MexicanTaxStrategy implements TaxService {
  private readonly logger = new Logger(MexicanTaxStrategy.name);
  private readonly cache = new Map<string, TaxTable[]>();

  constructor(
    @Inject(TAX_TABLE_REPOSITORY)
    private readonly repository: TaxTableRepository,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async calculateTax(taxableIncome: number, date: Date, frequency = 'MONTHLY', options?: Record<string, any>): Promise<number> {
      const result = await this.calculatePayrollTaxes(taxableIncome, date, frequency, options);
      return result.details.find(d => d.name === 'ISR')?.amount || 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async calculatePayrollTaxes(taxableIncome: number, date: Date, frequency = 'MONTHLY', options?: Record<string, any>): Promise<PayrollTaxesResult> {
    const isr = await this.calculateIsrInternal(taxableIncome, date, frequency);

    // IMSS Logic
    const uma = (options?.['uma'] as number) || DEFAULT_UMA;
    const imss = this.calculateImssInternal(taxableIncome, frequency, uma);

    return {
        totalTax: isr + imss,
        details: [
            { name: 'ISR', amount: isr },
            { name: 'IMSS', amount: imss }
        ]
    };
  }

  private async calculateIsrInternal(taxableIncome: number, date: Date, frequency: string): Promise<number> {
    const income = new Decimal(taxableIncome);

    if (income.lessThanOrEqualTo(0)) {
      return 0;
    }

    const year = date.getFullYear();
    const type = frequency.toUpperCase();
    const cacheKey = `${year}-${type}`;

    let tables = this.cache.get(cacheKey);

    if (!tables) {
       tables = await this.repository.findForYear(year, type);
       if (!tables || tables.length === 0) {
         this.logger.error(`No tax tables found for year ${year} and type ${type}`);
         throw new MissingTaxTableException(year, type);
       }
       // Sort tables by limit DESC
       tables.sort((a, b) => Number(b.limit) - Number(a.limit));
       this.cache.set(cacheKey, tables);
    }

    // Default to last row (lowest limit)
    let row = tables[tables.length - 1];

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

  private calculateImssInternal(totalIncome: number, frequency: string, uma: number): number {
      // Approximate days based on frequency for daily rate calculation
      let days = 15;
      if (frequency === 'MONTHLY') days = 30;
      if (frequency === 'WEEKLY') days = 7;
      if (frequency === 'BIWEEKLY') days = 14;

      const dailySbc = totalIncome / days;

      // Base: 2.375% of Total SBC (Employee Share)
      let imss = totalIncome * IMSS_BASE_RATE;

      const limitExcedente = 3 * uma;
      if (dailySbc > limitExcedente) {
          const excedenteDaily = (dailySbc - limitExcedente);
          const excedenteTotal = excedenteDaily * days;
          imss += excedenteTotal * IMSS_EXCESS_RATE;
      }

      return Number(imss.toFixed(2));
  }
}
