import { Module } from '@nestjs/common';
import { CreateWarehouseUseCase } from './use-cases/create-warehouse.use-case';
import { RegisterMovementUseCase } from './use-cases/register-movement.use-case';
import { GetWarehousesUseCase } from './use-cases/get-warehouses.use-case';

@Module({
  imports: [],
  providers: [
    CreateWarehouseUseCase,
    RegisterMovementUseCase,
    GetWarehousesUseCase,
  ],
  exports: [
    CreateWarehouseUseCase,
    RegisterMovementUseCase,
    GetWarehousesUseCase,
  ],
})
export class InventoryApplicationModule {}
