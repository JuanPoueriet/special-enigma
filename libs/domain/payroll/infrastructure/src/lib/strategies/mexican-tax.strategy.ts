import { Injectable, Inject, Logger } from '@nestjs/common';
import { TaxService, TaxTableRepository, MissingTaxTableException, TAX_TABLE_REPOSITORY, TaxTable, PayrollTaxesResult } from '@virteex/domain-payroll-domain';
import { Decimal } from 'decimal.js';

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
    // UMA must be provided in options (e.g. from TenantConfig or GlobalConfig)
    const uma = Number(options?.['uma']);
    if (!uma || isNaN(uma)) {
        this.logger.error('UMA not provided in options. Fallback UMA is prohibited.');
        throw new Error('UMA configuration is mandatory for Mexican Payroll calculation.');
    }
    const finalUma = uma;

    const imss = this.calculateImssInternal(taxableIncome, frequency, finalUma, options);

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
           this.logger.error(`No tax tables found in DB for year ${year} and type ${type}. Hard-fail enforced.`);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private calculateImssInternal(totalIncome: number, frequency: string, uma: number, options?: Record<string, any>): number {
      // Approximate days based on frequency for daily rate calculation
      let days = 15;
      if (frequency === 'MONTHLY') days = 30;
      if (frequency === 'WEEKLY') days = 7;
      if (frequency === 'BIWEEKLY') days = 14;
      if (frequency === 'SEMIMONTHLY') days = 15.2; // More precise? Defaulting to 15 is standard for "Quincenal" in Mexico (usually 15.2 or 15)

      // Allow overriding days
      if (options?.['daysPerPeriod']) {
          days = Number(options['daysPerPeriod']);
      }

      const dailySbc = totalIncome / days;

      // Base: Employee Share
      const imssBaseRate = options?.['imssBaseRate'] ? Number(options['imssBaseRate']) : 0.02375;
      const imssExcessRate = options?.['imssExcessRate'] ? Number(options['imssExcessRate']) : 0.004;

      let imss = totalIncome * imssBaseRate;

      const limitExcedente = 3 * uma;
      if (dailySbc > limitExcedente) {
          const excedenteDaily = (dailySbc - limitExcedente);
          const excedenteTotal = excedenteDaily * days;
          imss += excedenteTotal * imssExcessRate;
      }

      return Number(imss.toFixed(2));
  }
}
