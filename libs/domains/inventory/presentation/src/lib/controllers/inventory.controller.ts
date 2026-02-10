import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateWarehouseUseCase,
  CreateWarehouseDto,
  RegisterMovementUseCase,
  RegisterMovementDto,
  GetWarehousesUseCase,
} from '@virteex/inventory-application';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly createWarehouseUseCase: CreateWarehouseUseCase,
    private readonly registerMovementUseCase: RegisterMovementUseCase,
    private readonly getWarehousesUseCase: GetWarehousesUseCase,
  ) {}

  @Post('warehouses')
  @ApiOperation({ summary: 'Create a new warehouse' })
  async createWarehouse(@Body() dto: CreateWarehouseDto) {
    return this.createWarehouseUseCase.execute(dto);
  }

  @Post('movements')
  @ApiOperation({ summary: 'Register a stock movement' })
  async registerMovement(@Body() dto: RegisterMovementDto) {
    return this.registerMovementUseCase.execute(dto);
  }

  @Get('warehouses')
  @ApiOperation({ summary: 'Get all warehouses' })
  async getWarehouses(@Query('tenantId') tenantId: string) {
    return this.getWarehousesUseCase.execute(tenantId);
  }
}
