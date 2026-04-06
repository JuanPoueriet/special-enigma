import { Module, Inject, OnModuleInit } from '@nestjs/common';
import { GetTaxRateUseCase } from './use-cases/get-tax-rate.use-case';
import { FiscalJobHandler } from './handlers/fiscal-job.handler';
import { JOB_HANDLER_REGISTRY, JobHandler } from '@virtex/domain-scheduler-application';

@Module({
  imports: [],
  providers: [
    GetTaxRateUseCase,
    FiscalJobHandler
  ],
  exports: [
    GetTaxRateUseCase
  ]
})
export class FiscalApplicationModule implements OnModuleInit {
  constructor(
    @Inject(JOB_HANDLER_REGISTRY) private readonly registry: Map<string, JobHandler>,
    private readonly fiscalHandler: FiscalJobHandler
  ) {}

  onModuleInit() {
    this.registry.set('fiscal.invoice_issued', this.fiscalHandler);
  }
}
