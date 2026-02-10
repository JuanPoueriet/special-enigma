import { TaxTable } from '../entities/tax-table.entity';

export interface TaxTableRepository {
  findForYear(year: number, type: string): Promise<TaxTable[]>;
}
