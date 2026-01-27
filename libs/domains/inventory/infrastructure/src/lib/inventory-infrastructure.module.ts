import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  Warehouse,
  Location,
  InventoryMovement,
  Stock,
  WAREHOUSE_REPOSITORY,
  INVENTORY_REPOSITORY
} from '@virteex-erp/inventory-domain';
import { MikroOrmWarehouseRepository } from './repositories/mikro-orm-warehouse.repository';
import { MikroOrmInventoryRepository } from './repositories/mikro-orm-inventory.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([Warehouse, Location, InventoryMovement, Stock])
  ],
  providers: [
    {
      provide: WAREHOUSE_REPOSITORY,
      useClass: MikroOrmWarehouseRepository
    },
    {
      provide: INVENTORY_REPOSITORY,
      useClass: MikroOrmInventoryRepository
    }
  ],
  exports: [
    WAREHOUSE_REPOSITORY,
    INVENTORY_REPOSITORY,
    MikroOrmModule
  ]
})
export class InventoryInfrastructureModule {}
