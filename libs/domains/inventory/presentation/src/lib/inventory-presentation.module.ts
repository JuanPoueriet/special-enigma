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
import { InventoryController } from './controllers/inventory.controller';

@Module({
  imports: [InventoryApplicationModule, InventoryInfrastructureModule],
  controllers: [InventoryController],
  providers: [
    CreateWarehouseUseCase,
    RegisterMovementUseCase,
    GetWarehousesUseCase,
    UpdateWarehouseUseCase,
    DeleteWarehouseUseCase
  ]
})
export class InventoryPresentationModule {}
