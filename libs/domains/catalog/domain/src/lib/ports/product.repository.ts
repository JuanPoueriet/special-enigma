import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract save(product: Product): Promise<void>;
  abstract findBySku(sku: string): Promise<Product | null>;
}
