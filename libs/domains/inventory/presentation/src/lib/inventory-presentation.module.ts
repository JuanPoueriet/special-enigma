import { Module } from '@nestjs/common';
import {
  InventoryApplicationModule,
  CreateWarehouseUseCase,
  RegisterMovementUseCase,
  GetWarehousesUseCase,
  UpdateWarehouseUseCase,
  DeleteWarehouseUseCase
} from '../../../application/src/index';
import { InventoryInfrastructureModule } from '../../../infrastructure/src/index';

@Module({
  imports: [InventoryApplicationModule, InventoryInfrastructureModule],
  controllers: [],
  providers: [
    CreateWarehouseUseCase,
    RegisterMovementUseCase,
    GetWarehousesUseCase,
    UpdateWarehouseUseCase,
    DeleteWarehouseUseCase
  ]
})
export class InventoryPresentationModule {}
