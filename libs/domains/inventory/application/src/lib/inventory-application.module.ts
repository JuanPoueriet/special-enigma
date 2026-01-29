import { Module } from '@nestjs/common';
import { CreateWarehouseUseCase } from './use-cases/create-warehouse.use-case';
import { RegisterMovementUseCase } from './use-cases/register-movement.use-case';

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
