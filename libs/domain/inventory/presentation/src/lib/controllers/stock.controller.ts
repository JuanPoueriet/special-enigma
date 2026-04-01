import { Controller, Get, Param, Post, Query, Body, UseFilters, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CheckStockUseCase, ReserveStockUseCase } from '@virteex/domain-inventory-application';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virteex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virteex/kernel-entitlements';
import { ReserveStockDto } from './dto/reserve-stock.dto';
import { InventoryApplicationExceptionFilter } from '../filters/inventory-application-exception.filter';

@ApiTags('Inventory - Stock')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('inventory/stock')
@UseFilters(InventoryApplicationExceptionFilter)
export class StockController {
  constructor(
    private readonly reserveStockUseCase: ReserveStockUseCase,
    private readonly checkStockUseCase: CheckStockUseCase,
  ) {}

  @Post('reserve')
  @RequireEntitlement('inventory:stock:write')
  @ApiOperation({ summary: 'Reserve stock for a product' })
  async reserve(@Body() dto: ReserveStockDto, @CurrentTenant() tenantId: string) {
    await this.reserveStockUseCase.execute(tenantId, dto.warehouseId, dto.productSku, dto.quantity);
    return { message: 'Stock reserved successfully' };
  }

  @Get('check/:warehouseId/:productSku')
  @RequireEntitlement('inventory:stock:read')
  @ApiOperation({ summary: 'Check stock availability' })
  async checkStock(
    @Param('warehouseId') warehouseId: string,
    @Param('productSku') productSku: string,
    @Query('quantity') quantity: number
  ) {
    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      throw new BadRequestException('Quantity must be a positive number');
    }

    const available = await this.checkStockUseCase.execute(warehouseId, productSku, qty);
    return { available };
  }
}
