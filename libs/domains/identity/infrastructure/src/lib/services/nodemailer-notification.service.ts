import { Injectable, Logger } from '@nestjs/common';
import { NotificationService, User } from '@virteex/identity-domain';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerNotificationService implements NotificationService {
  private readonly logger = new Logger(NodemailerNotificationService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    const host = process.env['SMTP_HOST'];
    const port = Number(process.env['SMTP_PORT']);
    const user = process.env['SMTP_USER'];
    const pass = process.env['SMTP_PASSWORD'];

    if (!host || !port || !user || !pass) {
        throw new Error('SMTP Configuration missing (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD)');
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env['SMTP_SECURE'] === 'true',
      auth: {
        user,
        pass,
      },
    });
  }

  async sendWelcomeEmail(user: User): Promise<void> {
    const from = process.env['SMTP_FROM'] || '"Virteex ERP" <no-reply@virteex.com>';

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
