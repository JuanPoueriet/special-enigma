import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SetupChartOfAccountsUseCase, AccountingEventHandlerService } from '@virteex/domain-accounting-application';
import {
    InvoiceStampedEventDto,
    PayrollStampedEventDto,
    ACCOUNTING_EVENTS,
    ACCOUNTING_INTEGRATION_EVENTS,
    InvoiceStampedV1EventDto,
    PayrollStampedV1EventDto
} from '@virteex/domain-accounting-contracts';

@Injectable()
export class AccountingListener {
  private readonly logger = new Logger(AccountingListener.name);

  constructor(
    private readonly setupChartOfAccountsUseCase: SetupChartOfAccountsUseCase,
    private readonly eventHandlerService: AccountingEventHandlerService
  ) {}

  @OnEvent('tenant.created')
  async handleTenantCreated(event: { tenantId: string }) {
    this.logger.log(`Initializing Accounting Domain for new tenant: ${event.tenantId}`);
    try {
        await this.setupChartOfAccountsUseCase.execute(event.tenantId);
        this.logger.log(`Chart of Accounts initialized for tenant: ${event.tenantId}`);
    } catch (e) {
        const error = e as Error;
        this.logger.error(`Failed to initialize Chart of Accounts: ${error.message}`);
    }
  }

  @OnEvent(ACCOUNTING_INTEGRATION_EVENTS.INVOICE_STAMPED_V1)
  async handleInvoiceStampedV1(event: InvoiceStampedV1EventDto) {
    try {
        // ACL mapping: Integration DTO -> Internal Command
        await this.eventHandlerService.handleInvoiceStamped({
            invoiceId: event.invoiceId,
            tenantId: event.tenantId,
            total: event.totalAmount,
            taxes: event.taxAmount,
            date: new Date(event.stampedAt)
        });
        this.logger.log(`Journal Entry created for Invoice ${event.invoiceId} (V1)`);
    } catch (e) {
        const error = e as Error;
        this.logger.error(`Failed to create Journal Entry for Invoice ${event.invoiceId} (V1): ${error.message}`);
    }
  }

  @OnEvent(ACCOUNTING_INTEGRATION_EVENTS.PAYROLL_STAMPED_V1)
  async handlePayrollStampedV1(event: PayrollStampedV1EventDto) {
    try {
        // ACL mapping: Integration DTO -> Internal Command
        await this.eventHandlerService.handlePayrollStamped({
            payrollId: event.payrollId,
            tenantId: event.tenantId,
            netPay: event.netAmount,
            taxes: event.taxAmount,
            date: new Date(event.stampedAt)
        });
        this.logger.log(`Journal Entry created for Payroll ${event.payrollId} (V1)`);
    } catch (e) {
        const error = e as Error;
        this.logger.error(`Failed to create Journal Entry for Payroll ${event.payrollId} (V1): ${error.message}`);
    }
  }

  /**
   * @deprecated Keep legacy listeners for backward compatibility
   */
  @OnEvent(ACCOUNTING_EVENTS.INVOICE_STAMPED)
  async handleInvoiceStampedLegacy(event: InvoiceStampedEventDto) {
    this.logger.warn(`Received legacy InvoiceStampedEventDto for Invoice ${event.invoiceId}. Please migrate to V1.`);
    try {
        await this.eventHandlerService.handleInvoiceStamped({
            invoiceId: event.invoiceId,
            tenantId: event.tenantId,
            total: 0, // Legacy event doesn't have total
            taxes: 0, // Legacy event doesn't have taxes
            date: new Date(event.stampDate)
        });
    } catch (e) {
        this.logger.error(`Legacy handler failed: ${(e as Error).message}`);
    }
  }

  /**
   * @deprecated Keep legacy listeners for backward compatibility
   */
  @OnEvent(ACCOUNTING_EVENTS.PAYROLL_STAMPED)
  async handlePayrollStampedLegacy(event: PayrollStampedEventDto) {
    this.logger.warn(`Received legacy PayrollStampedEventDto for Payroll ${event.payrollId}. Please migrate to V1.`);
    try {
        await this.eventHandlerService.handlePayrollStamped({
            payrollId: event.payrollId,
            tenantId: event.tenantId,
            netPay: event.totalAmount, // In legacy, totalAmount was used for netPay
            taxes: 0,
            date: new Date(event.date)
        });
    } catch (e) {
        this.logger.error(`Legacy handler failed: ${(e as Error).message}`);
    }
  }
}
