import { Product } from '../entities/product.entity';

export interface ProductRepository {
  findAll(tenantId: string): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  findBySku(sku: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  findById(id: number): Promise<Product | null>;
  delete(id: number): Promise<void>;
}
