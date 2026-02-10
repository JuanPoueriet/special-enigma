import { Module } from '@nestjs/common';
import { GenerateReportUseCase } from './use-cases/generate-report.use-case';

@Module({
  providers: [GenerateReportUseCase],
  exports: [GenerateReportUseCase]
})
export class BiApplicationModule {}
