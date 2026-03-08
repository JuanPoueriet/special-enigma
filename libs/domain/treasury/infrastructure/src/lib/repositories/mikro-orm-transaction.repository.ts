import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Transaction, TransactionRepository } from '../../../../domain/src';

@Injectable()
export class MikroOrmTransactionRepository implements TransactionRepository {
  constructor(private readonly em: EntityManager) {}

  async findById(id: string): Promise<Transaction | null> {
    return this.em.findOne(Transaction, { id } as any);
  }

  async save(transaction: Transaction): Promise<void> {
    await this.em.persistAndFlush(transaction);
  }

  async findAll(tenantId: string): Promise<Transaction[]> {
    return this.em.find(Transaction, { tenantId } as any);
  }

  async findByBankAccountId(bankAccountId: string): Promise<Transaction[]> {
    return this.em.find(Transaction, { bankAccount: bankAccountId } as any);
  }

  async getCashFlowReport(tenantId: string, startDate: Date, endDate: Date): Promise<any[]> {
    // TODO: Implement actual cash flow report query using QueryBuilder.
    // This is a stub to allow the application to serve as requested.
    return [];
  }
}
