export interface IdempotencyRecord {
  tenantId: string;
  idempotencyKey: string;
  responsePayload: unknown;
  status: number;
  createdAt: Date;
}

export interface IdempotencyRepository {
  save(record: IdempotencyRecord): Promise<void>;
  findByKey(tenantId: string, idempotencyKey: string): Promise<IdempotencyRecord | null>;
}

export const IDEMPOTENCY_REPOSITORY = 'IDEMPOTENCY_REPOSITORY';
