import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReserveBatchStockUseCase } from '@virtex/domain-inventory-application';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virtex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';
import { ReserveBatchStockDto } from './dto/reserve-batch-stock.dto';
import { InventoryApplicationExceptionFilter } from '../filters/inventory-application-exception.filter';

@ApiTags('Inventory - Reservations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('inventory/reservations')
@UseFilters(InventoryApplicationExceptionFilter)
export class ReservationsController {
  constructor(private readonly reserveBatchStockUseCase: ReserveBatchStockUseCase) {}

  @Post('batch')
  @RequireEntitlement('inventory:stock:write')
  @ApiOperation({ summary: 'Reserve stock for multiple products atomically' })
  async reserveBatch(@Body() dto: ReserveBatchStockDto, @CurrentTenant() tenantId: string) {
    await this.reserveBatchStockUseCase.execute(tenantId, dto.items, dto.reference);
    return { message: 'Batch reservation successful' };
  }
}
