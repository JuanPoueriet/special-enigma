import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Transaction } from '../../../../domain/src/lib/entities/transaction.entity';
import { TransactionRepository } from '../../../../domain/src/lib/repositories/transaction.repository';

@Injectable()
export class MikroOrmTransactionRepository implements TransactionRepository {
  constructor(private readonly em: EntityManager) {}

  async create(transaction: Transaction): Promise<Transaction> {
    this.em.persist(transaction);
    await this.em.flush();
    return transaction;
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.em.findOne(Transaction, { id });
  }

  async findAll(tenantId: string): Promise<Transaction[]> {
    return this.em.find(Transaction, { tenantId }, { orderBy: { date: 'DESC' } });
  }
}
