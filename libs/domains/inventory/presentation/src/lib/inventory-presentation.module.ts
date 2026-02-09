import { Module } from '@nestjs/common';
import { InventoryApplicationModule } from '@virteex/inventory-application';
import { InventoryController } from '@virteex/inventory-presentation/lib/controllers/inventory.controller';

@Module({
  imports: [InventoryApplicationModule],
  controllers: [InventoryController],
})
export class InventoryPresentationModule {}
