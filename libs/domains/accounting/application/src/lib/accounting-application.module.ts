import { Module } from '@nestjs/common';
import { CreateAccountUseCase } from './use-cases/create-account.use-case';
import { RecordJournalEntryUseCase } from './use-cases/record-journal-entry.use-case';
import { GetAccountsUseCase } from './use-cases/get-accounts.use-case';
import { GetJournalEntriesUseCase } from './use-cases/get-journal-entries.use-case';
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
