import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateDeclarationUseCase, CreateDeclarationDto,
  GetFiscalStatsUseCase, GetTaxRulesUseCase
} from '@virteex/fiscal-application';

@ApiTags('Fiscal')
@Controller('fiscal')
export class FiscalController {
  constructor(
    private readonly createUseCase: CreateDeclarationUseCase,
    private readonly getStatsUseCase: GetFiscalStatsUseCase,
    private readonly getTaxRulesUseCase: GetTaxRulesUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'Fiscal' };
  }

  @Post('declarations')
  @ApiOperation({ summary: 'Create Tax Declaration' })
  create(@Body() dto: CreateDeclarationDto) {
    return this.createUseCase.execute(dto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get Fiscal Stats' })
  getStats(@Query('tenantId') tenantId: string) {
    return this.getStatsUseCase.execute(tenantId || 'default');
  }

  @Get('tax-rules')
  @ApiOperation({ summary: 'Get Tax Rules' })
  getTaxRules(@Query('tenantId') tenantId: string) {
    return this.getTaxRulesUseCase.execute(tenantId || 'default');
  }
}
