import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from '../../../../domain/src/lib/entities/transaction.entity';
import { TransactionRepository } from '../../../../domain/src/lib/repositories/transaction.repository';

@Injectable()
export class GetCashFlowUseCase {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private readonly transactionRepository: TransactionRepository
  ) {}

  async execute(tenantId: string): Promise<Transaction[]> {
    return this.transactionRepository.findAll(tenantId);
  }
}
