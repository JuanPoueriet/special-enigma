export class TaxDeclaration {
  id!: string;
  tenantId!: string;
  period!: string;
  amount!: string;
  status!: string;

  constructor(tenantId: string, period: string, amount: string) {
    this.tenantId = tenantId;
    this.period = period;
    this.amount = amount;
    this.status = 'DRAFT';
  }
}
