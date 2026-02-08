import { Injectable, Logger } from '@nestjs/common';
import { NotificationService, User } from '@virteex/identity-domain';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerNotificationService implements NotificationService {
  private readonly logger = new Logger(NodemailerNotificationService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env['SMTP_HOST'] || 'smtp.example.com',
      port: Number(process.env['SMTP_PORT']) || 587,
      secure: process.env['SMTP_SECURE'] === 'true', // true for 465, false for other ports
      auth: {
        user: process.env['SMTP_USER'],
        pass: process.env['SMTP_PASSWORD'],
      },
    });
  }

  async sendWelcomeEmail(user: User): Promise<void> {
    const from = process.env['SMTP_FROM'] || '"Virteex ERP" <no-reply@virteex.com>';

    try {
      this.logger.log(`Sending welcome email to ${user.email}`);

      if (!process.env['SMTP_USER'] || !process.env['SMTP_PASSWORD']) {
          this.logger.warn('SMTP credentials not configured. Skipping email sending.');
          // In production, this should probably throw or be handled strictly,
          // but for now we warn to avoid crashing if env vars are missing during dev.
          // However, user asked for "real implementation", so maybe I should throw?
          // I'll throw if it fails, but check config first.
          throw new Error('SMTP Configuration missing (SMTP_USER/SMTP_PASSWORD)');
      }

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
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${user.email}`, error);
      throw error; // Re-throw to ensure the caller knows it failed
    }
  }
}
