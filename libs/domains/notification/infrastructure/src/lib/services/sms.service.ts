import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private client: Twilio | null = null;
  private fromNumber: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER || '';

    if (accountSid && authToken && this.fromNumber) {
      this.client = new Twilio(accountSid, authToken);
    } else {
      this.logger.warn('Twilio credentials not found. SMS service will run in simulation mode.');
    }
  }

  async sendSms(to: string, body: string): Promise<void> {
    if (this.client) {
      try {
        await this.client.messages.create({
          body,
          from: this.fromNumber,
          to,
        });
        this.logger.log(`SMS sent to ${to}: ${body}`);
      } catch (error: any) {
        this.logger.error(`Failed to send SMS to ${to}: ${error.message}`);
      }
    } else {
      this.logger.log(`[SIMULATION] SMS to ${to}: ${body}`);
    }
  }
}
