import { Inject, Injectable } from '@nestjs/common';
import { JOURNAL_ENTRY_REPOSITORY, JournalEntryRepository } from '@virteex/accounting-domain';
import { JournalEntryDto } from '@virteex/accounting-contracts';
import { JournalEntryMapper } from '@virteex/accounting-application/lib/mappers/journal-entry.mapper';

@Injectable()
export class GetJournalEntriesUseCase {
  constructor(
    @Inject(JOURNAL_ENTRY_REPOSITORY) private journalEntryRepository: JournalEntryRepository
  ) {}

  async execute(tenantId: string): Promise<JournalEntryDto[]> {
    const entries = await this.journalEntryRepository.findAll(tenantId);
    return entries.map(JournalEntryMapper.toDto);
  }
}
