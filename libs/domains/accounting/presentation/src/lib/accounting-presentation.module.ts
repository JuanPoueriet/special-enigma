import { Module } from '@nestjs/common';
import { AccountsResolver } from './resolvers/accounts.resolver';
import { JournalEntriesResolver } from './resolvers/journal-entries.resolver';
import { AccountingApplicationModule } from '@virteex/accounting-application';

@Module({
  imports: [
    AccountingApplicationModule
  ],
  providers: [
    AccountsResolver,
    JournalEntriesResolver
  ],
})
export class AccountingPresentationModule {}
