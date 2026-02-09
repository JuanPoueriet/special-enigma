import { Module } from '@nestjs/common';
import { CreateWarehouseUseCase } from '@virteex/inventory-application/lib/use-cases/create-warehouse.use-case';
import { RegisterMovementUseCase } from '@virteex/inventory-application/lib/use-cases/register-movement.use-case';

@Module({
  imports: [],
  providers: [
    CreateWarehouseUseCase,
    RegisterMovementUseCase
  ],
  exports: [
    CreateWarehouseUseCase,
    RegisterMovementUseCase
  ]
})
export class InventoryApplicationModule {}
