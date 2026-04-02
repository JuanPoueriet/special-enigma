import { DomainException } from '@virtex/shared-util-server-server-config';
import { Injectable, Inject } from '@nestjs/common';
import {
  Transaction,
  TransactionType as DomainTransactionType,
  TransactionRepository,
  BankAccountRepository
} from '@virtex/domain-treasury-domain';
import {
  RegisterTransactionDto,
  TransactionType as ContractTransactionType
} from '@virtex/domain-treasury-contracts';


const TRANSACTION_TYPE_MAP: Record<ContractTransactionType, DomainTransactionType> = {
  [ContractTransactionType.DEPOSIT]: DomainTransactionType.CREDIT,
  [ContractTransactionType.WITHDRAWAL]: DomainTransactionType.DEBIT,
  [ContractTransactionType.TRANSFER]: DomainTransactionType.DEBIT
};

@Injectable()
export class RegisterTransactionUseCase {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private readonly transactionRepository: TransactionRepository,
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly bankAccountRepository: BankAccountRepository
  ) {}

  async execute(dto: RegisterTransactionDto): Promise<Transaction> {
    const bankAccount = await this.bankAccountRepository.findById(dto.bankAccountId);
    if (!bankAccount) {
      throw new DomainException('Bank account not found', 'ENTITY_NOT_FOUND');
    }

    const transaction = new Transaction(
      dto.tenantId,
      bankAccount,
      dto.amount,
      TRANSACTION_TYPE_MAP[dto.type],
      dto.description
    );

    await this.transactionRepository.save(transaction);
    return transaction;
  }
}
