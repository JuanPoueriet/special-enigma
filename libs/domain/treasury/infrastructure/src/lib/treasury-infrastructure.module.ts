import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { bankAccountSchema, cashFlowSchema, transactionSchema } from './persistence/treasury.schemas';
import { MikroOrmBankAccountRepository } from './repositories/mikro-orm-bank-account.repository';
import { MikroOrmTransactionRepository } from './repositories/mikro-orm-transaction.repository';
import { BANK_STATEMENT_PARSER } from '../../../contracts/src/lib/ports/bank-statement-parser.port';
import { CsvBankStatementParser } from './parsers/csv-parser';

@Module({
  imports: [
    MikroOrmModule.forFeature([bankAccountSchema, cashFlowSchema, transactionSchema]),
  ],
  providers: [
    {
      provide: 'BankAccountRepository',
      useClass: MikroOrmBankAccountRepository,
    },
    {
      provide: 'TransactionRepository',
      useClass: MikroOrmTransactionRepository,
    },
    {
      provide: BANK_STATEMENT_PARSER,
      useClass: CsvBankStatementParser,
    },
  ],
  exports: ['BankAccountRepository', 'TransactionRepository', BANK_STATEMENT_PARSER],
})
export class TreasuryInfrastructureModule {}
