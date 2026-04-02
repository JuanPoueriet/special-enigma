import { Injectable, Inject } from '@nestjs/common';
import { PRODUCT_READ_REPOSITORY, type ProductReadRepository, type Product } from '@virtex/domain-catalog-domain';

@Injectable()
export class GetProductBySkuUseCase {
  constructor(
    @Inject(PRODUCT_READ_REPOSITORY)
    private readonly repository: ProductReadRepository
  ) {}

  async execute(sku: string, tenantId: string): Promise<Product | null> {
    return this.repository.findBySku(sku, tenantId);
  }
}
