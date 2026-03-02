import { v4 as uuidv4 } from 'uuid';

export class FiscalTaxRule {
  id: string = uuidv4();
  tenantId!: string;
  name!: string;
  type!: string;
  rate!: string;
  appliesTo?: string;
  isActive = true;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(tenantId: string, name: string, type: string, rate: string, appliesTo?: string) {
    this.tenantId = tenantId;
    this.name = name;
    this.type = type;
    this.rate = rate;
    this.appliesTo = appliesTo;
  }
}
