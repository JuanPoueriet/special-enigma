import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService, User } from '@virteex/identity-domain';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerNotificationService implements NotificationService {
  private readonly logger = new Logger(NodemailerNotificationService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.getOrThrow<string>('SMTP_HOST');
    const port = this.configService.getOrThrow<number>('SMTP_PORT');
    const user = this.configService.getOrThrow<string>('SMTP_USER');
    const pass = this.configService.getOrThrow<string>('SMTP_PASSWORD');
    const secure = this.configService.get<boolean>('SMTP_SECURE') ?? false;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendWelcomeEmail(user: User): Promise<void> {
    const from = this.configService.get<string>('SMTP_FROM') || '"Virteex ERP" <no-reply@virteex.com>';

    this.logger.log(`Sending welcome email to ${user.email}`);

    await this.transporter.sendMail({
      from,
      to: user.email,
      subject: 'Welcome to Virteex ERP',
      text: `Welcome ${user.email} to Virteex ERP! Your company ${user.company.name} has been registered successfully.`,
      html: `
        <h1>Welcome to Virteex ERP</h1>
        <p>Hello <strong>${user.email}</strong>,</p>
        <p>Your company <strong>${user.company.name}</strong> has been registered successfully.</p>
        <p>You can now login and start using the platform.</p>
      `,
    });

    this.logger.log(`Welcome email sent to ${user.email}`);
  }
}
