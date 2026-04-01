export class FinancialReportSnapshot {
  id!: string;
  tenantId!: string;
  type!: string;
  endDate!: Date;
  generatedAt!: Date;
  data!: any;
  version!: number;
  userId!: string;

  constructor(tenantId: string, type: string, endDate: Date, data: any, version: number, userId: string) {
    this.tenantId = tenantId;
    this.type = type;
    this.endDate = endDate;
    this.data = data;
    this.version = version;
    this.userId = userId;
    this.generatedAt = new Date();
  }
}
