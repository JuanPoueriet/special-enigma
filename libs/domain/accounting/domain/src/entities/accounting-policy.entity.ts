import { DomainEvent } from '../events/domain-event.interface';

export class AccountingPolicy {
  id!: string;
  tenantId!: string;
  type!: string; // 'invoice', 'payroll', 'closing'
  rules!: Record<string, unknown>;

  private _domainEvents: DomainEvent[] = [];

  constructor(tenantId: string, type: string, rules: Record<string, unknown>) {
    this.tenantId = tenantId;
    this.type = type;
    this.rules = rules;
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  recordEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  clearEvents(): void {
    this._domainEvents = [];
  }
}
