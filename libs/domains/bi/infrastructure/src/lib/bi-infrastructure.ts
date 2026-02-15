import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BiReport, BI_REPORT_REPOSITORY, SALES_PORT } from '@virteex/bi-domain';
import { MikroOrmBiReportRepository } from './repositories/mikro-orm-bi-report.repository';
import { CrmSalesAdapter } from './adapters/crm-sales.adapter';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([BiReport])
  ],
  providers: [
    {
      provide: BI_REPORT_REPOSITORY,
      useClass: MikroOrmBiReportRepository
    },
    {
      provide: SALES_PORT,
      useClass: CrmSalesAdapter
    }
  ],
  exports: [
    MikroOrmModule,
    BI_REPORT_REPOSITORY,
    SALES_PORT
  ]
})
export class BiInfrastructureModule {}
