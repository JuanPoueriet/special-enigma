import { EntitySchema } from '@mikro-orm/core';

export interface IdempotencyEntity {
  tenantId: string;
  idempotencyKey: string;
  responsePayload: any;
  status: number;
  createdAt: Date;
}

export const IdempotencySchema = new EntitySchema<IdempotencyEntity>({
  name: 'Idempotency',
  properties: {
    tenantId: { type: 'string', primary: true },
    idempotencyKey: { type: 'string', primary: true },
    responsePayload: { type: 'json' },
    status: { type: 'number' },
    createdAt: { type: 'date' },
  },
});
