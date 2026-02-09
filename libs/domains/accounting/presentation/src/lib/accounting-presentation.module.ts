import { Module } from '@nestjs/common';
import { AccountsResolver } from '@virteex/accounting-presentation/lib/resolvers/accounts.resolver';
import { JournalEntriesResolver } from '@virteex/accounting-presentation/lib/resolvers/journal-entries.resolver';
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
