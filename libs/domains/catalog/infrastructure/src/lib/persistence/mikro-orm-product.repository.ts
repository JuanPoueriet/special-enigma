import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Product, ProductRepository } from '@virteex-erp/catalog-domain';

@Injectable()
export class MikroOrmProductRepository implements ProductRepository {
  constructor(private readonly em: EntityManager) {}

  async save(product: Product): Promise<void> {
    // MikroORM detects if it is new or existing
    await this.em.persistAndFlush(product);
  }

  async findBySku(sku: string): Promise<Product | null> {
    return this.em.findOne(Product, { sku });
    // The tenant filter is applied automatically here if configured
  }
}
