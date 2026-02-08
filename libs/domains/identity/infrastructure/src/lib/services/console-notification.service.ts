import { Injectable, Logger } from '@nestjs/common';
import { NotificationService, User } from '@virteex-erp/identity-domain';

@Injectable()
export class ConsoleNotificationService implements NotificationService {
  private readonly logger = new Logger(ConsoleNotificationService.name);

  async sendWelcomeEmail(user: User): Promise<void> {
    this.logger.log(`[Notification] Sending welcome email to ${user.email} (Company: ${user.company.name})`);
    // In real implementation, use Resend or SES
  }
}
