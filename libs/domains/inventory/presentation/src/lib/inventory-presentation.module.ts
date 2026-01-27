import { Module } from '@nestjs/common';
import { InventoryApplicationModule } from '@virteex-erp/inventory-application';
import { InventoryController } from './controllers/inventory.controller';

@Module({
  imports: [InventoryApplicationModule],
  controllers: [InventoryController],
})
export class InventoryPresentationModule {}
