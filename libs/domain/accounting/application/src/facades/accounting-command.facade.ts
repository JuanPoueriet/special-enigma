import { Injectable } from '@nestjs/common';
import {
  CreateAccountUseCase,
} from '../use-cases/accounts/create-account.use-case';
import {
  RecordJournalEntryUseCase,
} from '../use-cases/journal-entries/record-journal-entry.use-case';
import {
  SetupChartOfAccountsUseCase,
} from '../use-cases/accounts/setup-chart-of-accounts.use-case';
import {
  CloseFiscalPeriodUseCase,
} from '../use-cases/fiscal-periods/close-fiscal-period.use-case';
import { CreateAccountDto, RecordJournalEntryDto } from '@virteex/domain-accounting-contracts';

@Injectable()
export class AccountingCommandFacade {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly recordJournalEntryUseCase: RecordJournalEntryUseCase,
    private readonly setupChartOfAccountsUseCase: SetupChartOfAccountsUseCase,
    private readonly closeFiscalPeriodUseCase: CloseFiscalPeriodUseCase,
  ) {}

  async createAccount(dto: CreateAccountDto & { tenantId: string }) {
    return this.createAccountUseCase.execute(dto);
  }

  async recordJournalEntry(dto: RecordJournalEntryDto & { tenantId: string }) {
    return this.recordJournalEntryUseCase.execute(dto);
  }

  async setupChartOfAccounts(tenantId: string) {
    return this.setupChartOfAccountsUseCase.execute(tenantId);
  }

  async closeFiscalPeriod(tenantId: string, closingDate: Date) {
    return this.closeFiscalPeriodUseCase.execute(tenantId, closingDate);
  }
}
