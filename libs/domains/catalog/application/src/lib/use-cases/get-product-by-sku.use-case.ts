import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from '@virteex/catalog-domain';
import { Product } from '@virteex/catalog-domain';

@Injectable()
export class GetProductBySkuUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
  ) {}

  async execute(sku: string): Promise<Product | null> {
    return this.repository.findBySku(sku);
  }
}
