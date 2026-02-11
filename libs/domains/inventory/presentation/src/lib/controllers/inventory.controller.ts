import { Controller, Post, Body, Get, Put, Delete, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateWarehouseUseCase,
  CreateWarehouseDto,
  RegisterMovementUseCase,
  RegisterMovementDto,
  GetWarehousesUseCase,
  UpdateWarehouseUseCase,
  UpdateWarehouseDto,
  DeleteWarehouseUseCase
} from '@virteex/inventory-application';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly createWarehouseUseCase: CreateWarehouseUseCase,
    private readonly registerMovementUseCase: RegisterMovementUseCase,
    private readonly getWarehousesUseCase: GetWarehousesUseCase,
    private readonly updateWarehouseUseCase: UpdateWarehouseUseCase,
    private readonly deleteWarehouseUseCase: DeleteWarehouseUseCase
  ) {}

  @Post('warehouses')
  @ApiOperation({ summary: 'Create a new warehouse' })
  async createWarehouse(@Body() dto: CreateWarehouseDto) {
    return this.createWarehouseUseCase.execute(dto);
  }

  @Put('warehouses/:id')
  @ApiOperation({ summary: 'Update a warehouse' })
  async updateWarehouse(@Param('id') id: string, @Body() dto: UpdateWarehouseDto) {
    dto.id = id;
    return this.updateWarehouseUseCase.execute(dto);
  }

  @Delete('warehouses/:id')
  @ApiOperation({ summary: 'Delete a warehouse' })
  async deleteWarehouse(@Param('id') id: string) {
    return this.deleteWarehouseUseCase.execute(id);
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
