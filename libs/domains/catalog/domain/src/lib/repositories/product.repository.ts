import { Product } from '../entities/product.entity';

export interface ProductRepository {
  findAll(tenantId: string): Promise<Product[]>;
  create(product: Product): Promise<Product>;
}
