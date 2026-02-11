import { Module } from '@nestjs/common';
import { CreateWarehouseUseCase } from './use-cases/create-warehouse.use-case';
import { RegisterMovementUseCase } from './use-cases/register-movement.use-case';
import { GetWarehousesUseCase } from './use-cases/get-warehouses.use-case';
import { UpdateWarehouseUseCase } from './use-cases/update-warehouse.use-case';
import { DeleteWarehouseUseCase } from './use-cases/delete-warehouse.use-case';

@Module({
  imports: [],
  providers: [
    CreateWarehouseUseCase,
    RegisterMovementUseCase,
    GetWarehousesUseCase,
    UpdateWarehouseUseCase,
    DeleteWarehouseUseCase
  ],
  exports: [
    CreateWarehouseUseCase,
    RegisterMovementUseCase,
    GetWarehousesUseCase,
    UpdateWarehouseUseCase,
    DeleteWarehouseUseCase
  ],
})
export class InventoryApplicationModule {}
