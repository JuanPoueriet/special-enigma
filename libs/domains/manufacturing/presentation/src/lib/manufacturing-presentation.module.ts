import { Module } from '@nestjs/common';
import { ManufacturingController } from './controllers/manufacturing.controller';

@Module({
  controllers: [ManufacturingController],
})
export class ManufacturingPresentationModule {}
