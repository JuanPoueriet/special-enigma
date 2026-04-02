import { Body, Controller, Get, Post, Query, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { CreateAccountDto, RecordJournalEntryDto, RecordInvoiceDto, RecordPaymentDto, GenerateFinancialReportDto, CloseFiscalPeriodDto, ReopenFiscalPeriodDto, FinancialReportDto } from '@virtex/domain-accounting-contracts';
import {
  AccountingCommandFacade,
  AccountingQueryFacade
} from '@virtex/domain-accounting-application';
import { CurrentTenant, CurrentUser } from '@virtex/kernel-auth';
import { IdempotencyInterceptor } from '@virtex/shared-util-server-server-config';
import { CapabilityGuard } from '../../guards/capability.guard';
import { RequiresCapability } from '../../guards/requires-capability.decorator';
import { ClosingTaskStatus } from '@virtex/domain-accounting-domain';

@ApiTags('Accounting')
@Controller('accounting')
@UseInterceptors(IdempotencyInterceptor)
@UseGuards(CapabilityGuard)
export class AccountingController {
  constructor(
    private readonly commandFacade: AccountingCommandFacade,
    private readonly queryFacade: AccountingQueryFacade,
  ) {}

  @Post('accounts')
  @RequiresCapability('accounting:account:create')
  @ApiOperation({ summary: 'Create a new account' })
  async createAccount(
    @CurrentTenant() tenantId: string,
    @Body() dto: CreateAccountDto
  ) {
    return this.commandFacade.createAccount({ ...dto, tenantId });
  }

  @Post('journal-entries')
  @RequiresCapability('accounting:journal-entry:create')
  @ApiOperation({ summary: 'Record a new journal entry' })
  @ApiHeader({ name: 'x-idempotency-key', required: false, description: 'Optional idempotency key' })
  async recordJournalEntry(
    @CurrentTenant() tenantId: string,
    @CurrentUser() user: any,
    @Body() dto: RecordJournalEntryDto
  ) {
    return this.commandFacade.recordJournalEntry({ ...dto, tenantId, userId: user?.id });
  }

  @Get('accounts')
  @RequiresCapability('accounting:account:read')
  @ApiOperation({ summary: 'Get all accounts' })
  async getAccounts(@CurrentTenant() tenantId: string) {
    return this.queryFacade.getAccounts(tenantId);
  }

  @Get('journal-entries')
  @RequiresCapability('accounting:journal-entry:read')
  @ApiOperation({ summary: 'Get all journal entries' })
  async getJournalEntries(@CurrentTenant() tenantId: string) {
    return this.queryFacade.getJournalEntries(tenantId);
  }

  @Post('setup')
  @RequiresCapability('accounting:setup:execute')
  @ApiOperation({ summary: 'Setup initial chart of accounts' })
  async setupChartOfAccounts(@CurrentTenant() tenantId: string) {
    return this.commandFacade.setupChartOfAccounts(tenantId);
  }

  @Get('reports/financial')
  @RequiresCapability('accounting:report:generate')
  @ApiOperation({ summary: 'Generate financial report' })
  async generateFinancialReport(
    @CurrentTenant() tenantId: string,
    @CurrentUser() user: any,
    @Query() dto: GenerateFinancialReportDto & { saveSnapshot?: string }
  ): Promise<FinancialReportDto> {
    const report = await this.queryFacade.generateFinancialReport(tenantId, dto.type as any, new Date(dto.endDate), dto.dimensions, dto.saveSnapshot === 'true', user?.id);
    return {
        ...report,
        generatedAt: report.generatedAt.toISOString(),
        endDate: report.endDate.toISOString(),
        previousEndDate: report.previousEndDate?.toISOString(),
        type: report.type as any
    };
  }

  @Post('closing')
  @RequiresCapability('accounting:period:close')
  @ApiOperation({ summary: 'Close fiscal period (Fiscal Closing)' })
  @ApiHeader({ name: 'x-idempotency-key', required: false, description: 'Optional idempotency key' })
  async closeFiscalPeriod(
    @CurrentTenant() tenantId: string,
    @CurrentUser() user: any,
    @Body() dto: CloseFiscalPeriodDto
  ) {
    return this.commandFacade.closeFiscalPeriod(tenantId, new Date(dto.closingDate), user?.id || 'system');
  }

  @Post('closing/reopen')
  @RequiresCapability('accounting:period:reopen')
  @ApiOperation({ summary: 'Reopen a closed fiscal period' })
  async reopenFiscalPeriod(
    @CurrentTenant() tenantId: string,
    @CurrentUser() user: any,
    @Body() dto: ReopenFiscalPeriodDto
  ) {
    const hasOverridePermission = user?.permissions?.includes('accounting:period:override-lock') || false;
    return this.commandFacade.reopenFiscalPeriod(tenantId, new Date(dto.closingDate), user?.id || 'system', dto.reason, dto.approverId, hasOverridePermission);
  }

  @Post('consolidation')
  @RequiresCapability('accounting:consolidation:run')
  @ApiOperation({ summary: 'Perform multi-entity consolidation' })
  @ApiHeader({ name: 'x-idempotency-key', required: false, description: 'Optional idempotency key' })
  async consolidate(
    @CurrentTenant() targetTenantId: string,
    @Body() dto: { sourceTenantIds: string[], asOfDate: string }
  ) {
    return this.commandFacade.consolidateAccounts(targetTenantId, dto.sourceTenantIds, new Date(dto.asOfDate));
  }

  @Get('fiscal-periods')
  @RequiresCapability('accounting:period:read')
  @ApiOperation({ summary: 'Get all fiscal periods' })
  async getFiscalPeriods(@CurrentTenant() tenantId: string) {
    return this.queryFacade.getFiscalPeriods(tenantId);
  }

  @Get('closing-tasks')
  @RequiresCapability('accounting:period:read')
  @ApiOperation({ summary: 'Get closing tasks for a period' })
  async getClosingTasks(
    @CurrentTenant() tenantId: string,
    @Query('fiscalPeriodId') fiscalPeriodId: string
  ) {
    return this.queryFacade.getClosingTasks(tenantId, fiscalPeriodId);
  }

  @Post('closing-tasks/:id/status')
  @RequiresCapability('accounting:period:close')
  @ApiOperation({ summary: 'Update closing task status' })
  async updateClosingTask(
    @CurrentTenant() tenantId: string,
    @CurrentUser() user: any,
    @Body() dto: { id: string, status: string, evidenceUrl?: string }
  ) {
    return this.commandFacade.updateClosingTask(tenantId, dto.id, dto.status as ClosingTaskStatus, user?.id || 'system', dto.evidenceUrl);
  }

  @Post('bank-reconciliation')
  @RequiresCapability('accounting:bank:reconcile')
  @ApiOperation({ summary: 'Perform bank reconciliation' })
  async bankReconciliation(
    @CurrentTenant() tenantId: string,
    @Body() dto: { accountId: string, statementLines: any[], rules?: any }
  ) {
    return this.commandFacade.bankReconciliation(tenantId, dto.accountId, dto.statementLines, dto.rules);
  }

  @Post('invoices')
  @RequiresCapability('accounting:invoice:create')
  @ApiOperation({ summary: 'Record a new invoice (AP/AR)' })
  async recordInvoice(
    @CurrentTenant() tenantId: string,
    @CurrentUser() user: any,
    @Body() dto: RecordInvoiceDto
  ) {
    return this.commandFacade.recordInvoice(tenantId, dto, user?.id);
  }

  @Post('payments')
  @RequiresCapability('accounting:payment:create')
  @ApiOperation({ summary: 'Record a new payment' })
  async recordPayment(
    @CurrentTenant() tenantId: string,
    @CurrentUser() user: any,
    @Body() dto: RecordPaymentDto
  ) {
    return this.commandFacade.recordPayment(tenantId, dto, user?.id);
  }
}
