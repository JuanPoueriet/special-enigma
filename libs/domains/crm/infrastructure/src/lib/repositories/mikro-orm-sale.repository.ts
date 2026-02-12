import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Sale } from '../../../../domain/src/index';
import { SaleRepository } from '../../../../domain/src/lib/repositories/sale.repository';

@Injectable()
export class MikroOrmSaleRepository implements SaleRepository {
  constructor(private readonly em: EntityManager) {}

  async create(sale: Sale): Promise<Sale> {
    this.em.persist(sale);
    await this.em.flush();
    return sale;
  }

  async findById(id: string): Promise<Sale | null> {
    return this.em.findOne(Sale, { id }, { populate: ['items'] });
  }

  async findAll(tenantId: string): Promise<Sale[]> {
    return this.em.find(Sale, { tenantId }, { populate: ['items'], orderBy: { createdAt: 'DESC' } });
  }
}
