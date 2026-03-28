import { Module } from '@nestjs/common';
import { GenerateReportHandler } from './use-cases/commands/generate-report/generate-report.handler';
import { GetArAgingHandler } from './use-cases/queries/get-ar-aging/get-ar-aging.handler';
import { GetDashboardStatsHandler } from './use-cases/queries/get-dashboard-stats/get-dashboard-stats.handler';
import { GetExpensesHandler } from './use-cases/queries/get-expenses/get-expenses.handler';
import { GetInvoiceStatusHandler } from './use-cases/queries/get-invoice-status/get-invoice-status.handler';
import { GetTopProductsHandler } from './use-cases/queries/get-top-products/get-top-products.handler';

@Module({
  providers: [
    GenerateReportHandler,
    GetArAgingHandler,
    GetDashboardStatsHandler,
    GetExpensesHandler,
    GetInvoiceStatusHandler,
    GetTopProductsHandler,
  ],
  exports: [
    GenerateReportHandler,
    GetArAgingHandler,
    GetDashboardStatsHandler,
    GetExpensesHandler,
    GetInvoiceStatusHandler,
    GetTopProductsHandler,
  ],
})
export class BiApplicationModule {}
