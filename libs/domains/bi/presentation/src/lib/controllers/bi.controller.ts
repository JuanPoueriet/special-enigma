import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GenerateReportUseCase, GenerateReportDto, GetTopProductsUseCase } from '@virteex/bi-application';

@ApiTags('BI')
@Controller('bi')
export class BiController {
  constructor(
    private readonly generateUseCase: GenerateReportUseCase,
    private readonly getTopProductsUseCase: GetTopProductsUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'BI' };
  }

  @Post('reports')
  @ApiOperation({ summary: 'Generate Report' })
  generate(@Body() dto: GenerateReportDto) {
    return this.generateUseCase.execute(dto);
  }

  @Get('top-products')
  @ApiOperation({ summary: 'Get Top Products' })
  getTopProducts(@Query('tenantId') tenantId: string) {
    return this.getTopProductsUseCase.execute(tenantId || 'default');
  }
}
