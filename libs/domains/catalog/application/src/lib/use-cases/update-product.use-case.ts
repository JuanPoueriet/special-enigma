import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '@virteex/catalog-domain/lib/repositories/product.repository';
import { Product } from '@virteex/catalog-domain/lib/entities/product.entity';

export interface UpdateProductDto {
  id: number;
  sku?: string;
  name?: string;
  price?: string;
  fiscalCode?: string;
  taxGroup?: string;
  isActive?: boolean;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository
  ) {}

  async execute(dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findById(dto.id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${dto.id} not found`);
    }

    if (dto.sku) product.sku = dto.sku;
    if (dto.name) product.name = dto.name;
    if (dto.price) product.changePrice(dto.price);
    if (dto.fiscalCode !== undefined) product.fiscalCode = dto.fiscalCode;
    if (dto.taxGroup !== undefined) product.taxGroup = dto.taxGroup;
    if (dto.isActive !== undefined) product.isActive = dto.isActive;

    await this.productRepository.save(product);
    return product;
  }
}
