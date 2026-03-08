import { Module } from '@nestjs/common';
import { DataQualityService } from './data-quality.service';

@Module({
  providers: [DataQualityService],
  exports: [DataQualityService],
})
export class DataQualityModule {}
