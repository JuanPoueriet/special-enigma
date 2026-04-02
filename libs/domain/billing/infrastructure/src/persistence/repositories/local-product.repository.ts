import { Injectable, Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { type ProductRepository, type BillingProduct } from '@virteex/domain-billing-domain';
import { BillingProductEntity } from '../entities/billing-product.entity';

@Injectable()
export class LocalProductRepository implements ProductRepository {
  private readonly logger = new Logger(LocalProductRepository.name);

  constructor(private readonly em: EntityManager) {}

  async findById(id: string): Promise<BillingProduct | null> {
    const product = await this.em.findOne(BillingProductEntity, { id });
    if (!product || !product.isActive) {
      return null;
    }

    const p = product as any;
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      taxGroup: p.taxGroup,
      fiscalCode: p.fiscalCode
    };
  }
}
