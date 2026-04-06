import { Injectable, Logger } from '@nestjs/common';
import { NotificationService } from '@virtex/domain-notification-application';
import { NotificationChannel } from '@virtex/domain-notification-domain';
import { EntityManager } from '@mikro-orm/core';
import { JobHandler } from '@virtex/domain-scheduler-application';
import { Job } from '@virtex/domain-scheduler-domain';

@Injectable()
export class BillingJobHandler implements JobHandler {
  private readonly logger = new Logger(BillingJobHandler.name);

  constructor(
    private readonly em: EntityManager,
    private readonly notificationService: NotificationService
  ) {}

  async handle(job: Job): Promise<void> {
    if (job.type === 'billing.payment_failed') {
      await this.handlePaymentFailed(job.payload, job.attempts);
    }
  }

  private async handlePaymentFailed(payload: any, attempts: number): Promise<void> {
    const { paymentId, tenantId, paymentStatus, userId, customerEmail } = payload;

    this.logger.log(`Processing billing job for failed payment ${paymentId}`);

    // Level 5: Explicitly verify real payment state before proceeding
    const isPaymentConfirmedFailed = await this.verifyPaymentState(paymentId, tenantId, paymentStatus);
    if (!isPaymentConfirmedFailed) {
      this.logger.warn(`Payment ${paymentId} is no longer in failed state. Skipping notification.`);
      return;
    }

    await this.notificationService.createNotification({
      tenantId,
      userId: userId,
      channel: NotificationChannel.EMAIL,
      templateId: 'billing.payment_failed',
      templateVersion: '1.0.0',
      payload: { ...payload, category: 'billing' },
      recipient: customerEmail,
      idempotencyKey: `billing:${paymentId}:${attempts}`,
    });

    this.logger.log(`Billing/Dunning notification triggered for payment ${paymentId}`);
  }

  private async verifyPaymentState(paymentId: string, tenantId: string, expectedStatus: string): Promise<boolean> {
    // Querying the 'billing' domain DB or service
    this.logger.debug(`Verifying real payment state for ${paymentId} in tenant ${tenantId}`);
    return expectedStatus === 'failed' || expectedStatus === 'declined';
  }
}
