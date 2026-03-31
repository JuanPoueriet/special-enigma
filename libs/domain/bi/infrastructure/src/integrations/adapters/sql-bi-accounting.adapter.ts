import { Injectable } from '@nestjs/common';
import { BiAccountingPort } from '@virteex/domain-bi-domain';
import { IAccountingReportingPort } from '@virteex/domain-accounting-contracts';

@Injectable()
export class SqlBiAccountingAdapter implements BiAccountingPort {
  constructor(private readonly accountingReportingPort: IAccountingReportingPort) {}

  async getMonthlyOpex(tenantId: string): Promise<number> {
    return this.accountingReportingPort.getMonthlyOpex(tenantId);
  }
}
