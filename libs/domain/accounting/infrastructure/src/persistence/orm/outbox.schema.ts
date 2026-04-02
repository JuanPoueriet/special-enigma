import { EntitySchema } from '@mikro-orm/core';
import { OutboxMessage } from '@virtex/domain-accounting-domain';

export const OutboxMessageSchema = new EntitySchema<OutboxMessage>({
  name: 'OutboxMessage',
  properties: {
    id: { primary: true, type: 'uuid' },
    aggregateId: { type: 'string' },
    aggregateType: { type: 'string' },
    eventType: { type: 'string' },
    payload: { type: 'json' },
    createdAt: { type: 'date', onCreate: () => new Date() },
    processedAt: { type: 'date', nullable: true },
    tenantId: { type: 'string', index: true },
  },
});
