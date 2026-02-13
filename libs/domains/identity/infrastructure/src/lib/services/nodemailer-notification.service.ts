import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService, User } from '@virteex/identity-domain';
import { MailQueueProducer } from './mail-queue.producer';

@Injectable()
export class NodemailerNotificationService implements NotificationService {
  private readonly logger = new Logger(NodemailerNotificationService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly mailQueueProducer: MailQueueProducer
  ) {}

  async sendWelcomeEmail(user: User, tempPassword?: string): Promise<void> {
    this.logger.log(`Queueing welcome email for ${user.email}`);

    let htmlContent = `
        <h1>Welcome to Virteex ERP</h1>
        <p>Hello <strong>${user.email}</strong>,</p>
        <p>Your company <strong>${user.company.name}</strong> has been registered successfully.</p>
    `;

    if (tempPassword) {
      htmlContent += `
        <p>You have been invited to join the platform. Your temporary password is:</p>
        <p style="font-size: 1.2em; font-weight: bold; background-color: #f0f0f0; padding: 10px; display: inline-block;">${tempPassword}</p>
        <p>Please login and change your password immediately.</p>
      `;
    } else {
      htmlContent += `<p>You can now login and start using the platform.</p>`;
    }

    const textContent = `Welcome ${user.email} to Virteex ERP! Your company ${user.company.name} has been registered successfully.${tempPassword ? ' Your temporary password is: ' + tempPassword : ''}`;

    await this.mailQueueProducer.addEmailJob({
      to: user.email,
      subject: 'Welcome to Virteex ERP',
      text: textContent,
      html: htmlContent,
    });
  }
}
