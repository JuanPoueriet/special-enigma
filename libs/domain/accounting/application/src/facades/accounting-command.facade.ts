import { Injectable, Inject } from '@nestjs/common';
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
import {
  ConsolidateAccountsUseCase,
} from '../use-cases/consolidation/consolidate-accounts.use-case';
import { CreateAccountDto, RecordJournalEntryDto } from '@virteex/domain-accounting-contracts';
import { CLOSING_TASK_REPOSITORY, type ClosingTaskRepository, type ClosingTaskStatus } from '@virteex/domain-accounting-domain';

@Injectable()
export class AccountingCommandFacade {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly recordJournalEntryUseCase: RecordJournalEntryUseCase,
    private readonly setupChartOfAccountsUseCase: SetupChartOfAccountsUseCase,
    private readonly closeFiscalPeriodUseCase: CloseFiscalPeriodUseCase,
    private readonly consolidateAccountsUseCase: ConsolidateAccountsUseCase,
    @Inject(CLOSING_TASK_REPOSITORY) private readonly closingTaskRepository: ClosingTaskRepository,
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

  async reopenFiscalPeriod(tenantId: string, closingDate: Date, userId: string = 'system', reason?: string, approverId?: string) {
    return this.closeFiscalPeriodUseCase.reopen(tenantId, closingDate, userId, reason, approverId);
  }

  async consolidateAccounts(targetTenantId: string, sourceTenantIds: string[], asOfDate: Date) {
    return this.consolidateAccountsUseCase.execute(targetTenantId, sourceTenantIds, asOfDate);
  }

  async updateClosingTask(tenantId: string, taskId: string, status: ClosingTaskStatus, userId: string, evidenceUrl?: string) {
    const task = await this.closingTaskRepository.findById(tenantId, taskId);
    if (!task) throw new Error('Task not found');

    if (status === 'COMPLETED') {
        task.complete(userId, evidenceUrl);
    } else {
        task.reset();
    }
    return this.closingTaskRepository.save(task);
  }
}
