import { Module } from '@nestjs/common';
import { ManufacturingController } from './controllers/manufacturing.controller';
import { ManufacturingApplicationModule } from '@virteex/manufacturing-application';

@Module({
  imports: [ManufacturingApplicationModule],
  controllers: [ManufacturingController],
})
export class ManufacturingPresentationModule {}
