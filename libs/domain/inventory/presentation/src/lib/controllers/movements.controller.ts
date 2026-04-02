import { Controller, Post, Body, UseGuards, UseFilters } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterMovementUseCase } from '@virtex/domain-inventory-application';
import { RegisterMovementDto } from '../dto/register-movement.dto';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virtex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';
import { InventoryApplicationExceptionFilter } from '../filters/inventory-application-exception.filter';

@ApiTags('Inventory - Movements')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('inventory/movements')
@UseFilters(InventoryApplicationExceptionFilter)
export class MovementsController {
  constructor(private readonly registerMovementUseCase: RegisterMovementUseCase) {}

  @Post()
  @RequireEntitlement('inventory:movements:write')
  @ApiOperation({ summary: 'Register an inventory movement' })
  async registerMovement(@Body() dto: RegisterMovementDto, @CurrentTenant() tenantId: string) {
    dto.tenantId = tenantId;
    await this.registerMovementUseCase.execute(dto);
    return { message: 'Movement registered successfully' };
  }
}
