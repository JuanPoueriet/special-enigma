import { Injectable, Inject, Logger } from '@nestjs/common';
import { TransactionRepository, BankAccountRepository } from '@virteex/domain-treasury-domain';
import { BankStatementParser, StatementLine } from '../services/bank-statement-parser.service';

export interface ReconciliationResult {
  matched: { line: StatementLine; transactionId: string }[];
  unmatched: StatementLine[];
  totalProcessed: number;
}

@Injectable()
export class ReconcileBankStatementUseCase {
  private readonly logger = new Logger(ReconcileBankStatementUseCase.name);

  constructor(
    @Inject('TransactionRepository') private readonly transactionRepo: TransactionRepository,
    @Inject('BankAccountRepository') private readonly bankAccountRepo: BankAccountRepository,
    private readonly parser: BankStatementParser
  ) {}

  async execute(tenantId: string, bankAccountId: string, fileContent: string, format: 'csv' | 'ofx'): Promise<ReconciliationResult> {
    const bankAccount = await this.bankAccountRepo.findById(bankAccountId);
    if (!bankAccount || bankAccount.tenantId !== tenantId) {
       throw new Error('Bank account not found or access denied');
    }

    const lines = format === 'ofx' ? this.parser.parseOfx(fileContent) : this.parser.parseCsv(fileContent);
    const transactions = await this.transactionRepo.findByBankAccountId(bankAccountId);

    const matched: { line: StatementLine; transactionId: string }[] = [];
    const unmatched: StatementLine[] = [];

    for (const line of lines) {
       // Simple matching logic: same day, same amount (ignoring description for now)
       const match = transactions.find(t =>
         new Date(t.date).toDateString() === line.date.toDateString() &&
         Math.abs(t.amount - line.amount) < 0.01 &&
         !matched.some(m => m.transactionId === t.id)
       );

       if (match) {
          matched.push({ line, transactionId: match.id });
          this.logger.log(`Matched statement line ${line.description} with transaction ${match.id}`);
       } else {
          unmatched.push(line);
          this.logger.warn(`Could not match statement line ${line.description} on ${line.date.toDateString()}`);
       }
    }

    return {
      matched,
      unmatched,
      totalProcessed: lines.length
    };
  }
}
