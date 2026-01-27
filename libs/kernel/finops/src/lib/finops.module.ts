import { Module } from '@nestjs/common';
import { FinOpsService } from './finops.service';

@Module({
  providers: [FinOpsService],
  exports: [FinOpsService]
})
export class FinOpsModule {}
