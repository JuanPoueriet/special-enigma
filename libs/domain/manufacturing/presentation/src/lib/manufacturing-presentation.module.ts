import { Module } from '@nestjs/common';
import { ManufacturingController } from './controllers/manufacturing.controller';
import { ManufacturingApplicationModule } from '@virtex/domain-manufacturing-application';
import { ManufacturingInfrastructureModule } from '@virtex/domain-manufacturing-infrastructure';

@Module({
  imports: [ManufacturingApplicationModule, ManufacturingInfrastructureModule],
  controllers: [ManufacturingController],
})
export class ManufacturingPresentationModule {}
