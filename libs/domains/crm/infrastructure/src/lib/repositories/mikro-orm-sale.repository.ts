import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Sale } from '../../../../domain/src/lib/entities/sale.entity';
import { SaleRepository } from '../../../../domain/src/lib/repositories/sale.repository';

@Injectable()
export class MikroOrmSaleRepository implements SaleRepository {
  constructor(
    @InjectRepository(Sale)
    private readonly repository: EntityRepository<Sale>,
  ) {}

  async create(sale: Sale): Promise<Sale> {
    this.repository.getEntityManager().persist(sale);
    await this.repository.getEntityManager().flush();
    return sale;
  }

  async findById(id: string): Promise<Sale | null> {
    return this.repository.findOne({ id }, { populate: ['items'] });
  }
}
