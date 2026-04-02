import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RecordJournalEntryUseCase, GetJournalEntriesUseCase } from '@virtex/domain-accounting-application';
import { CurrentTenant } from '@virtex/kernel-auth';
import { JournalEntryObject } from '../http/dto/journal-entry.object';
import { RecordJournalEntryInput } from '../http/dto/record-journal-entry.input';

@Resolver(() => JournalEntryObject)
export class JournalEntriesResolver {
  constructor(
    private readonly recordJournalEntryUseCase: RecordJournalEntryUseCase,
    private readonly getJournalEntriesUseCase: GetJournalEntriesUseCase
  ) {}

  @Mutation(() => JournalEntryObject)
  async recordJournalEntry(
    @CurrentTenant() tenantId: string,
    @Args('input') input: RecordJournalEntryInput
  ) {
    return this.recordJournalEntryUseCase.execute({ ...input, tenantId });
  }

  @Query(() => [JournalEntryObject], { name: 'journalEntries' })
  async getJournalEntries(@CurrentTenant() tenantId: string) {
    return this.getJournalEntriesUseCase.execute(tenantId);
  }
}
