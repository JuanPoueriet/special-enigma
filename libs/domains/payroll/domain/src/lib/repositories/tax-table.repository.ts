import { TaxTable } from '../entities/tax-table.entity';

export const TAX_TABLE_REPOSITORY = 'TAX_TABLE_REPOSITORY'; // Added constant

export interface TaxTableRepository {
  findForYear(year: number, type: string): Promise<TaxTable[]>;
}
