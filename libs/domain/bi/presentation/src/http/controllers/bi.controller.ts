import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  GenerateReportHandler,
  GetTopProductsHandler,
  GetInvoiceStatusHandler,
  GetArAgingHandler,
  GetExpensesHandler,
  GenerateReportCommand,
  GetTopProductsQuery,
  GetInvoiceStatusQuery,
  GetArAgingQuery,
  GetExpensesQuery
} from '@virteex/domain-bi-application';
import { GenerateReportRequest } from '@virteex/domain-bi-contracts';

@ApiTags('BI')
@Controller('bi')
export class BiController {
  constructor(
    private readonly generateHandler: GenerateReportHandler,
    private readonly getTopProductsHandler: GetTopProductsHandler,
    private readonly getInvoiceStatusHandler: GetInvoiceStatusHandler,
    private readonly getArAgingHandler: GetArAgingHandler,
    private readonly getExpensesHandler: GetExpensesHandler
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'BI' };
  }

  @Post('reports')
  @ApiOperation({ summary: 'Generate Report' })
  generate(@Body() dto: GenerateReportRequest, @Query('tenantId') tenantId: string) {
    return this.generateHandler.handle(new GenerateReportCommand({ ...dto, tenantId: tenantId || 'default' }));
  }

  @Get('top-products')
  @ApiOperation({ summary: 'Get Top Products' })
  getTopProducts(@Query('tenantId') tenantId: string) {
    return this.getTopProductsHandler.handle(new GetTopProductsQuery(tenantId || 'default'));
  }

  @Get('invoice-status')
  @ApiOperation({ summary: 'Get Invoice Status Summary' })
  getInvoiceStatus(@Query('tenantId') tenantId: string) {
    return this.getInvoiceStatusHandler.handle(new GetInvoiceStatusQuery(tenantId || 'default'));
  }

  @Get('ar-aging')
  @ApiOperation({ summary: 'Get AR Aging' })
  getArAging(@Query('tenantId') tenantId: string) {
    return this.getArAgingHandler.handle(new GetArAgingQuery(tenantId || 'default'));
  }

  @Get('expenses')
  @ApiOperation({ summary: 'Get Expenses Breakdown' })
  getExpenses(@Query('tenantId') tenantId: string) {
    return this.getExpensesHandler.handle(new GetExpensesQuery(tenantId || 'default'));
  }
}
