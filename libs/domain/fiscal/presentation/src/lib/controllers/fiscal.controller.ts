import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateDeclarationUseCase, CreateDeclarationDto,
  GetFiscalStatsUseCase, GetTaxRulesUseCase,
  CreateTaxRuleUseCase, CreateTaxRuleDto,
  GetTaxRateUseCase
} from '@virteex/domain-fiscal-application';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virteex/kernel-auth';
import { RequireEntitlement } from '@virteex/kernel-entitlements';

@ApiTags('Fiscal')
@ApiBearerAuth()
@Controller('fiscal')
@UseGuards(JwtAuthGuard, TenantGuard)
@RequireEntitlement('fiscal')
export class FiscalController {
  constructor(
    private readonly createUseCase: CreateDeclarationUseCase,
    private readonly getStatsUseCase: GetFiscalStatsUseCase,
    private readonly getTaxRulesUseCase: GetTaxRulesUseCase,
    private readonly createTaxRuleUseCase: CreateTaxRuleUseCase,
    private readonly getTaxRateUseCase: GetTaxRateUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'Fiscal' };
  }

  @Post('declarations')
  @ApiOperation({ summary: 'Create Tax Declaration' })
  create(@Body() dto: CreateDeclarationDto, @CurrentTenant() tenantId: string) {
    dto.tenantId = tenantId;
    return this.createUseCase.execute(dto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get Fiscal Stats' })
  getStats(@CurrentTenant() tenantId: string) {
    return this.getStatsUseCase.execute(tenantId);
  }

  @Get('tax-rules')
  @ApiOperation({ summary: 'Get Tax Rules' })
  getTaxRules(@CurrentTenant() tenantId: string) {
    return this.getTaxRulesUseCase.execute(tenantId);
  }

  @Post('tax-rules')
  @ApiOperation({ summary: 'Create Tax Rule' })
  createTaxRule(@Body() dto: CreateTaxRuleDto, @CurrentTenant() tenantId: string) {
    dto.tenantId = tenantId;
    return this.createTaxRuleUseCase.execute(dto);
  }

  @Get('tax-rate')
  @ApiOperation({ summary: 'Get Tax Rate' })
  async getTaxRate(@CurrentTenant() tenantId: string) {
    const rate = await this.getTaxRateUseCase.execute(tenantId);
    return { rate };
  }
}
