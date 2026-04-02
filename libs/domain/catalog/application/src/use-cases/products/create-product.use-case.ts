import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Product, ProductCreatedEvent, PRODUCT_READ_REPOSITORY, type ProductReadRepository, PRODUCT_WRITE_REPOSITORY, type ProductWriteRepository } from '@virtex/domain-catalog-domain';
import { EntitlementService } from '@virtex/kernel-entitlements';
import { getTenantContext } from '@virtex/kernel-auth';

export interface CreateProductDto {
  sku: string;
  name: string;
  price: string;
}

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_READ_REPOSITORY)
    private readonly productReadRepository: ProductReadRepository,
    @Inject(PRODUCT_WRITE_REPOSITORY)
    private readonly productWriteRepository: ProductWriteRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly entitlementService: EntitlementService
  ) {}

  async execute(command: CreateProductDto & { tenantId?: string }): Promise<Product> {
    const tenantId = command.tenantId || getTenantContext()?.tenantId || 'system';

    const existing = await this.productReadRepository.findBySku(command.sku, tenantId);
    if (existing) {
      throw new Error('Product with this SKU already exists');
    }

    const allProducts = await this.productReadRepository.findAll(tenantId);
    await this.entitlementService.checkQuota('products', allProducts.length);

    const product = new Product(command.sku, command.name, command.price);
    await this.productWriteRepository.save(product);

    this.eventEmitter.emit(
      'catalog.product.created',
      new ProductCreatedEvent(
        product.id,
        product.tenantId,
        product.sku,
        product.name,
        product.price,
        product.isActive,
        new Date(),
        product.taxGroup,
        product.fiscalCode
      )
    );

    return product;
  }
}
