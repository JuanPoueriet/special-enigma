import { Injectable } from '@nestjs/common';
import { Decimal } from 'decimal.js';
import { DomainException } from '@virtex/kernel-exceptions';
import { type ProductRepository } from '@virtex/domain-billing-domain';

@Injectable()
export class PriceValidationPolicy {
  async resolvePrice(productRepository: ProductRepository, productId: string | undefined, providedUnitPrice: number): Promise<Decimal> {
    let resolvedPrice = new Decimal(providedUnitPrice);

    if (!productId) {
      return resolvedPrice;
    }

    const product = await productRepository.findById(productId);
    if (!product) {
      throw new DomainException(`Product with ID ${productId} not found`, 'PRODUCT_NOT_FOUND');
    }

    const catalogPrice = new Decimal(product.price);
    if (!resolvedPrice.equals(catalogPrice)) {
      resolvedPrice = catalogPrice;
    }

    return resolvedPrice;
  }
}
