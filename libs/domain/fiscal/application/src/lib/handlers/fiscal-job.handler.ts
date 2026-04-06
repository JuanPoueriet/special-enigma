import { Injectable, Logger } from '@nestjs/common';
import { NotificationService } from '@virtex/domain-notification-application';
import { NotificationChannel } from '@virtex/domain-notification-domain';
import { FiscalDomainService } from '@virtex/domain-fiscal-domain';
import { JobHandler } from '@virtex/domain-scheduler-application';
import { Job } from '@virtex/domain-scheduler-domain';

@Injectable()
export class FiscalJobHandler implements JobHandler {
  private readonly logger = new Logger(FiscalJobHandler.name);

  constructor(
    private readonly notificationService: NotificationService,
    private readonly fiscalDomainService: FiscalDomainService
  ) {}

  async handle(job: Job): Promise<void> {
    if (job.type === 'fiscal.invoice_issued') {
      await this.handleInvoiceIssued(job.payload, job.attempts);
    }
  }

  private async handleInvoiceIssued(payload: any, attempts: number): Promise<void> {
    const { invoiceId, tenantId, status, userId, customerEmail } = payload;

    this.logger.log(`Processing fiscal job for invoice ${invoiceId}`);

    const realStatus = await this.fiscalDomainService.verifyInvoiceLegalStatus(invoiceId, tenantId);

    if (realStatus !== status) {
      throw new Error(`Inconsistent legal status for invoice ${invoiceId}: Expected ${status}, but found ${realStatus}`);
    }

    await this.notificationService.createNotification({
      tenantId,
      userId: userId,
      channel: NotificationChannel.EMAIL,
      templateId: 'fiscal.invoice_issued',
      templateVersion: '1.0.0',
      payload: { ...payload, category: 'fiscal' },
      recipient: customerEmail,
      idempotencyKey: `fiscal:${invoiceId}:${attempts}`,
    });

    this.logger.log(`Fiscal notification triggered for invoice ${invoiceId}`);
  }
}
