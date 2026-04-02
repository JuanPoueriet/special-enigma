import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductionOrderUseCase, GetProductionOrdersUseCase } from '@virtex/domain-manufacturing-application';
import { CreateProductionOrderDto } from '../dto/create-production-order.dto';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virtex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';

@ApiTags('Manufacturing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('manufacturing')
export class ManufacturingController {
  constructor(
    private readonly createUseCase: CreateProductionOrderUseCase,
    private readonly getUseCase: GetProductionOrdersUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'Manufacturing' };
  }

  @Post('orders')
  @RequireEntitlement('manufacturing:write')
  @ApiOperation({ summary: 'Create Production Order' })
  create(@Body() dto: CreateProductionOrderDto, @CurrentTenant() tenantId: string) {
    dto.tenantId = tenantId;
    return this.createUseCase.execute(dto);
  }

  @Get('orders')
  @RequireEntitlement('manufacturing:read')
  @ApiOperation({ summary: 'Get all Production Orders' })
  findAll(@CurrentTenant() tenantId: string) {
    return this.getUseCase.execute(tenantId);
  }
}
