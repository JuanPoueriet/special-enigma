import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Product } from '@virteex/catalog-domain/lib/entities/product.entity';
import { ProductRepository } from '@virteex/catalog-domain/lib/repositories/product.repository';

@Injectable()
export class MikroOrmProductRepository implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: EntityRepository<Product>,
  ) {}

  async findAll(tenantId: string): Promise<Product[]> {
    return this.repository.find({ tenantId });
  }

  async create(product: Product): Promise<Product> {
    this.repository.getEntityManager().persist(product);
    return product;
  }
}
