import { Module } from '@nestjs/common';
import { FinOpsService } from '@virteex/finops/lib/finops.service';
import { USAGE_REPOSITORY } from '@virteex/finops/lib/ports/usage.repository';
import { InMemoryUsageRepository } from '@virteex/finops/lib/infrastructure/memory-usage.repository';

@Module({
  controllers: [],
  providers: [
    FinOpsService,
    {
      provide: USAGE_REPOSITORY,
      useClass: InMemoryUsageRepository
    }
  ],
  exports: [FinOpsService],
})
export class FinOpsModule {}
