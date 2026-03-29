import { DomainEvent } from '../events/domain-event.interface';

export enum FiscalYearStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export class FiscalYear {
  id!: string;
  tenantId!: string;
  year!: number;
  status: FiscalYearStatus = FiscalYearStatus.OPEN;
  startDate!: Date;
  endDate!: Date;

  private _domainEvents: DomainEvent[] = [];

  constructor(tenantId: string, year: number, startDate: Date, endDate: Date) {
    this.tenantId = tenantId;
    this.year = year;
    this.startDate = startDate;
    this.endDate = endDate;
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
