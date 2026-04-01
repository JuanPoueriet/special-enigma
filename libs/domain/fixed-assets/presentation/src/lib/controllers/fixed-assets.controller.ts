import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateFixedAssetUseCase, CreateFixedAssetDto, GetFixedAssetsUseCase } from '@virteex/domain-fixed-assets-application';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virteex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virteex/kernel-entitlements';

@ApiTags('Fixed Assets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('fixed-assets')
export class FixedAssetsController {
  constructor(
    private readonly createUseCase: CreateFixedAssetUseCase,
    private readonly getUseCase: GetFixedAssetsUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'FixedAssets' };
  }

  @Post()
  @RequireEntitlement('fixed-assets:write')
  @ApiOperation({ summary: 'Create Fixed Asset' })
  create(@Body() dto: CreateFixedAssetDto, @CurrentTenant() tenantId: string) {
    dto.tenantId = tenantId;
    return this.createUseCase.execute(dto);
  }

  @Get()
  @RequireEntitlement('fixed-assets:read')
  @ApiOperation({ summary: 'Get all Fixed Assets' })
  findAll(@CurrentTenant() tenantId: string) {
    return this.getUseCase.execute(tenantId);
  }
}
