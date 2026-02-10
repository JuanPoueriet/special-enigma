import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BiReport, BI_REPORT_REPOSITORY } from '@virteex/bi-domain';
import { MikroOrmBiReportRepository } from './repositories/mikro-orm-bi-report.repository';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature([BiReport])
  ],
  providers: [
    {
      provide: BI_REPORT_REPOSITORY,
      useClass: MikroOrmBiReportRepository
    }
  ],
  exports: [
    MikroOrmModule,
    BI_REPORT_REPOSITORY
  ]
})
export class BiInfrastructureModule {}
