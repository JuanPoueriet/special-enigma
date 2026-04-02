import { Injectable, Inject } from '@nestjs/common';
import { type FiscalDataProvider, FISCAL_DATA_PROVIDER } from '@virtex/domain-fiscal-domain';

@Injectable()
export class GetFiscalStatsUseCase {
  constructor(
    @Inject(FISCAL_DATA_PROVIDER)
    private readonly fiscalDataProvider: FiscalDataProvider
  ) {}

  execute(tenantId: string) {
    return this.fiscalDataProvider.getFiscalStats(tenantId);
  }
}
