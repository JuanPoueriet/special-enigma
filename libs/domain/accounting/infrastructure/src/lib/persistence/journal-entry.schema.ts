import { EntitySchema, Cascade } from '@mikro-orm/core';
import { JournalEntry } from '@virteex/domain-accounting-domain';
import { JournalEntryLine } from '@virteex/domain-accounting-domain';
import { JournalEntryStatus } from '@virteex/contracts-accounting-contracts';

export const JournalEntrySchema = new EntitySchema<JournalEntry>({
  class: JournalEntry,
  properties: {
    id: { primary: true, type: 'uuid' },
    tenantId: { type: 'string' },
    date: { type: 'date' },
    description: { type: 'string' },
    status: { enum: true, items: () => JournalEntryStatus, default: JournalEntryStatus.DRAFT },
    lines: {
      reference: '1:m',
      entity: 'JournalEntryLine',
      mappedBy: 'journalEntry',
      cascade: [Cascade.ALL],
    },
  },
});
