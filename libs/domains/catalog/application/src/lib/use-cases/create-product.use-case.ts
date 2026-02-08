import { Injectable } from '@nestjs/common';
import { Product } from '@virteex/catalog-domain';
import { ProductRepository } from '@virteex/catalog-domain';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepo: ProductRepository) {}

  async execute(command: { sku: string; name: string; price: number }): Promise<Product> {
    // 1. Validate business uniqueness (if not done by DB)
    const existing = await this.productRepo.findBySku(command.sku);
    if (existing) {
      throw new Error('Product with this SKU already exists');
    }

    // 2. Create the Aggregate
    const product = new Product(command.sku, command.name, command.price);

    // 3. Persist (TenantSubscriber will inject tenantId automatically)
    await this.productRepo.save(product);

    return product;
  }
}
