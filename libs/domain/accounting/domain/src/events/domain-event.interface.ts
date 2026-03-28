export interface DomainEvent {
  readonly occurredAt: string;
  readonly eventName: string;
  readonly aggregateId: string;
  readonly tenantId: string;
}
