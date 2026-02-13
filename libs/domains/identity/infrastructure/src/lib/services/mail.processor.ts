import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Worker, Job } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailProcessor implements OnModuleInit {
  private readonly logger = new Logger(MailProcessor.name);
  private worker: Worker;
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

  onModuleInit() {
    const redisHost = this.configService.get<string>('REDIS_HOST', 'localhost');
    const redisPort = this.configService.get<number>('REDIS_PORT', 6379);

    this.worker = new Worker('mail-queue', async (job: Job) => {
      this.logger.log(`Processing email job ${job.id} for ${job.data.to}`);
      await this.sendEmail(job.data);
    }, {
      connection: {
        host: redisHost,
        port: redisPort,
      },
    });

    this.worker.on('completed', (job) => {
      this.logger.log(`Email job ${job.id} completed`);
    });

    this.worker.on('failed', (job, err) => {
      this.logger.error(`Email job ${job?.id} failed`, err);
    });
  }

  private async sendEmail(data: { to: string; subject: string; text: string; html: string; from?: string }) {
    const from = data.from || this.configService.get<string>('SMTP_FROM') || '"Virteex ERP" <no-reply@virteex.com>';

    await this.transporter.sendMail({
      from,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
  }
}
