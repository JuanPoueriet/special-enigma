import { Module } from '@nestjs/common';
import { InventoryInfrastructureModule } from '@virteex-erp/inventory-infrastructure';
import { CreateWarehouseUseCase } from './use-cases/create-warehouse.use-case';
import { RegisterMovementUseCase } from './use-cases/register-movement.use-case';

@Module({
  imports: [InventoryInfrastructureModule],
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
