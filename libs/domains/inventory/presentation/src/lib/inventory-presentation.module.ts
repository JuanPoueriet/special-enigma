import { Module } from '@nestjs/common';
import { InventoryApplicationModule } from '@virteex/inventory-application';
import { InventoryInfrastructureModule } from '@virteex/inventory-infrastructure';
import { InventoryController } from './controllers/inventory.controller';

@Module({
  imports: [InventoryApplicationModule, InventoryInfrastructureModule],
  controllers: [InventoryController],
})
export class InventoryPresentationModule {}
