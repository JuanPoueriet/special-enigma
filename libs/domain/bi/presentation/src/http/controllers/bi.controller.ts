import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentTenant } from '@virteex/shared-util-server-server-config';
import { JwtAuthGuard, TenantGuard } from '@virteex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virteex/kernel-entitlements';
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
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
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
  @RequireEntitlement('bi:reports:write')
  @ApiOperation({ summary: 'Generate Report' })
  generate(@Body() dto: GenerateReportRequest, @CurrentTenant() tenantId: string) {
    return this.generateHandler.handle(new GenerateReportCommand({ ...dto, tenantId }));
  }

  @Get('top-products')
  @RequireEntitlement('bi:reports:read')
  @ApiOperation({ summary: 'Get Top Products' })
  getTopProducts(@CurrentTenant() tenantId: string) {
    return this.getTopProductsHandler.handle(new GetTopProductsQuery(tenantId));
  }

  @Get('invoice-status')
  @RequireEntitlement('bi:reports:read')
  @ApiOperation({ summary: 'Get Invoice Status Summary' })
  getInvoiceStatus(@CurrentTenant() tenantId: string) {
    return this.getInvoiceStatusHandler.handle(new GetInvoiceStatusQuery(tenantId));
  }

  @Get('ar-aging')
  @RequireEntitlement('bi:reports:read')
  @ApiOperation({ summary: 'Get AR Aging' })
  getArAging(@CurrentTenant() tenantId: string) {
    return this.getArAgingHandler.handle(new GetArAgingQuery(tenantId));
  }

  @Get('expenses')
  @RequireEntitlement('bi:reports:read')
  @ApiOperation({ summary: 'Get Expenses Breakdown' })
  getExpenses(@CurrentTenant() tenantId: string) {
    return this.getExpensesHandler.handle(new GetExpensesQuery(tenantId));
  }
}
