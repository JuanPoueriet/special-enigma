import { Sale } from '../entities/sale.entity';

export interface SaleRepository {
  create(sale: Sale): Promise<Sale>;
  findById(id: string): Promise<Sale | null>;
  findAll(tenantId: string): Promise<Sale[]>;
  abstract getTopProducts(tenantId: string, limit: number): Promise<{ name: string; value: number }[]>;
}
