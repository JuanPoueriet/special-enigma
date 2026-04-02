import { Injectable } from '@nestjs/common';
import { BiAccountingPort } from '@virtex/domain-bi-domain';
import { IAccountingReportingPort } from '@virtex/domain-accounting-contracts';

@Injectable()
export class SqlBiAccountingAdapter implements BiAccountingPort {
  constructor(private readonly accountingReportingPort: IAccountingReportingPort) {}

  async getMonthlyOpex(tenantId: string): Promise<number> {
    return this.accountingReportingPort.getMonthlyOpex(tenantId);
  }
}
