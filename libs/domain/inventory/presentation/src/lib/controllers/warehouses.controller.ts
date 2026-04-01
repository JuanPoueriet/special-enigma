import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete, UseFilters } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateWarehouseUseCase, GetWarehousesUseCase, GetWarehouseUseCase, UpdateWarehouseUseCase, DeleteWarehouseUseCase, type CreateWarehouseDto } from '@virteex/domain-inventory-application';
import { JwtAuthGuard, CurrentTenant } from '@virteex/kernel-auth';
import { UpdateWarehouseBodyDto } from './dto/update-warehouse-body.dto';
import { InventoryApplicationExceptionFilter } from '../filters/inventory-application-exception.filter';

@ApiTags('Inventory - Warehouses')
@ApiBearerAuth()
@Controller('inventory/warehouses')
@UseGuards(JwtAuthGuard)
@UseFilters(InventoryApplicationExceptionFilter)
export class WarehousesController {
  constructor(
    private readonly getWarehousesUseCase: GetWarehousesUseCase,
    private readonly getWarehouseUseCase: GetWarehouseUseCase,
    private readonly createWarehouseUseCase: CreateWarehouseUseCase,
    private readonly updateWarehouseUseCase: UpdateWarehouseUseCase,
    private readonly deleteWarehouseUseCase: DeleteWarehouseUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new warehouse' })
  async createWarehouse(@Body() dto: CreateWarehouseDto, @CurrentTenant() tenantId: string) {
    dto.tenantId = tenantId;
    return this.createWarehouseUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all warehouses for authenticated tenant' })
  async getWarehouses(@CurrentTenant() tenantId: string) {
    return this.getWarehousesUseCase.execute(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get warehouse by ID' })
  async getWarehouse(@Param('id') id: string, @CurrentTenant() tenantId: string) {
    return this.getWarehouseUseCase.execute(id, tenantId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a warehouse' })
  async updateWarehouse(@Param('id') id: string, @Body() dto: UpdateWarehouseBodyDto, @CurrentTenant() tenantId: string) {
    return this.updateWarehouseUseCase.execute({ id, tenantId, ...dto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete warehouse by ID' })
  async deleteWarehouse(@Param('id') id: string, @CurrentTenant() tenantId: string) {
    return this.deleteWarehouseUseCase.execute(id, tenantId);
  }
}
