import { Controller, Post, Body } from '@nestjs/common';
import {
  CreateWarehouseUseCase,
  CreateWarehouseDto,
  RegisterMovementUseCase,
  RegisterMovementDto
} from '@virteex/inventory-application';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly createWarehouseUseCase: CreateWarehouseUseCase,
    private readonly registerMovementUseCase: RegisterMovementUseCase
  ) {}

  @Post('warehouses')
  async createWarehouse(@Body() dto: CreateWarehouseDto) {
    return this.createWarehouseUseCase.execute(dto);
  }

  @Post('movements')
  async registerMovement(@Body() dto: RegisterMovementDto) {
    return this.registerMovementUseCase.execute(dto);
  }
}
