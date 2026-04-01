import { type Product } from '../entities/product.entity';

export const PRODUCT_READ_REPOSITORY = 'PRODUCT_READ_REPOSITORY';

export interface ProductReadRepository {
  findAll(tenantId: string): Promise<Product[]>;
  findBySku(sku: string, tenantId: string): Promise<Product | null>;
  findById(id: number, tenantId: string): Promise<Product | null>;
}
