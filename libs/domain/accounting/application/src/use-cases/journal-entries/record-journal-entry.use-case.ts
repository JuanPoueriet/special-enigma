import { JournalEntry, JournalEntryLine, type JournalEntryRepository, type AccountRepository, AccountNotFoundError, CrossTenantAccessError, PeriodClosedError, type AuditLogRepository, AuditLog } from '@virteex/domain-accounting-domain';
import { type ITelemetryService } from '@virteex/kernel-telemetry';
import { type RecordJournalEntryDto, type JournalEntryDto } from '@virteex/domain-accounting-contracts';
import { JournalEntryMapper } from '../../mappers/journal-entry.mapper';
import { IUnitOfWork } from '../../ports/outbound/unit-of-work.port';

export class RecordJournalEntryUseCase {
  constructor(
    private journalEntryRepository: JournalEntryRepository,
    private accountRepository: AccountRepository,
    private telemetryService: ITelemetryService,
    private uow: IUnitOfWork,
    private auditLogRepository?: AuditLogRepository
  ) {}

  async execute(dto: Omit<RecordJournalEntryDto, 'date'> & { date: string | Date; tenantId: string; userId?: string }): Promise<JournalEntryDto> {
    const startTime = Date.now();
    this.telemetryService.setTraceAttributes({ tenantId: dto.tenantId, useCase: 'RecordJournalEntry' });

    const handleExecute = async () => {
        const latestClosedDate = await this.journalEntryRepository.findLatestClosedDate(dto.tenantId);
        if (latestClosedDate && new Date(dto.date) <= latestClosedDate) {
            throw new PeriodClosedError(new Date(dto.date));
        }

        const entry = new JournalEntry(dto.tenantId, dto.description, new Date(dto.date));

        for (const lineDto of dto.lines) {
            const account = await this.accountRepository.findById(dto.tenantId, lineDto.accountId);
            if (!account) {
                throw new AccountNotFoundError(lineDto.accountId);
            }

            if (account.tenantId !== dto.tenantId) {
                throw new CrossTenantAccessError();
            }

            const line = new JournalEntryLine(account, lineDto.debit, lineDto.credit);
            line.description = lineDto.description;
            entry.addLine(line);
        }

        entry.validateBalance();

        const savedEntry = await this.journalEntryRepository.create(entry);

        if (this.auditLogRepository) {
            await this.auditLogRepository.create(new AuditLog(
                dto.tenantId,
                dto.userId || 'system',
                'RECORD_JOURNAL_ENTRY',
                'JournalEntry',
                savedEntry.id,
                { description: dto.description, amount: dto.lines[0]?.debit || dto.lines[0]?.credit }
            ));
        }

        this.telemetryService.recordBusinessMetric('accounting_record_journal_entry_latency_ms', Date.now() - startTime, { tenantId: dto.tenantId });
        this.telemetryService.recordBusinessMetric('accounting_record_journal_entry_success_total', 1, { tenantId: dto.tenantId });

        return JournalEntryMapper.toDto(savedEntry);
    };

    return this.uow.transactional(handleExecute);
  }
}
