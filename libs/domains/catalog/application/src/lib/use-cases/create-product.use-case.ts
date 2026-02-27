import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Product } from '@virteex/domain-catalog-domain/lib/entities/product.entity';
import { ProductRepository } from '@virteex/domain-catalog-domain/lib/repositories/product.repository';
import { ProductCreatedEvent } from '@virteex/domain-catalog-domain';

export interface CreateProductDto {
  sku: string;
  name: string;
  price: string;
}

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async execute(command: CreateProductDto): Promise<Product> {
    const existing = await this.productRepo.findBySku(command.sku);
    if (existing) {
      throw new Error('Product with this SKU already exists');
    }

    if (!/^\d+(\.\d{1,2})?$/.test(command.price)) {
      throw new Error('Price must be a decimal string with up to 2 decimal places');
    }

    const product = new Product(command.sku, command.name, command.price);

    await this.productRepo.save(product);

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
