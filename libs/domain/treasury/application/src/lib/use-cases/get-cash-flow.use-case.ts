import { Injectable, Inject } from '@nestjs/common';
import { Transaction } from '@virtex/domain-treasury-domain';
import { TransactionRepository } from '@virtex/domain-treasury-domain';

@Injectable()
export class GetCashFlowUseCase {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private readonly transactionRepository: TransactionRepository
  ) {}

  async execute(tenantId: string, startDate?: Date, endDate?: Date): Promise<any[]> {
    const start = startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate || new Date();
    return this.transactionRepository.getCashFlowReport(tenantId, start, end);
  }
}
