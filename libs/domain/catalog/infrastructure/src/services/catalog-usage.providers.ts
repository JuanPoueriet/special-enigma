import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { EntitlementService, UsageProvider } from '@virtex/kernel-entitlements';
import { PRODUCT_READ_REPOSITORY, type ProductReadRepository } from '@virtex/domain-catalog-domain';

@Injectable()
export class ProductUsageProvider implements UsageProvider, OnModuleInit {
  constructor(
    private readonly entitlementService: EntitlementService,
    @Inject(PRODUCT_READ_REPOSITORY)
    private readonly productRepository: ProductReadRepository,
  ) {}

  onModuleInit() {
    this.entitlementService.registerUsageProvider(this);
  }

  getResource(): string {
    return 'products';
  }

  async countUsage(tenantId: string): Promise<number> {
    const products = await this.productRepository.findAll(tenantId);
    return products.length;
  }
}
