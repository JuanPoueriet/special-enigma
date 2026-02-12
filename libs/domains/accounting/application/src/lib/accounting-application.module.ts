import { Module } from '@nestjs/common';
import { CreateAccountUseCase } from '@virteex/accounting-application/lib/use-cases/create-account.use-case';
import { RecordJournalEntryUseCase } from '@virteex/accounting-application/lib/use-cases/record-journal-entry.use-case';
import { GetAccountsUseCase } from '@virteex/accounting-application/lib/use-cases/get-accounts.use-case';
import { GetJournalEntriesUseCase } from '@virteex/accounting-application/lib/use-cases/get-journal-entries.use-case';
import { AccountingInfrastructureModule } from '@virteex/accounting-infrastructure';

@Module({
  imports: [AccountingInfrastructureModule],
  providers: [
    CreateAccountUseCase,
    RecordJournalEntryUseCase,
    GetAccountsUseCase,
    GetJournalEntriesUseCase
  ],
  exports: [
    CreateAccountUseCase,
    RecordJournalEntryUseCase,
    GetAccountsUseCase,
    GetJournalEntriesUseCase
  ],
})
export class AccountingApplicationModule {}
