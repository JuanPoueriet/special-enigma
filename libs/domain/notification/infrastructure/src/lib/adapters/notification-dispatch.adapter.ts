import { Injectable } from '@nestjs/common';
import { Notification, NotificationChannel, NotificationDispatchPort } from '@virtex/domain-notification-domain';
import { EmailService } from '../services/email.service';
import { SmsService } from '../services/sms.service';
import { PushNotificationService } from '../services/push-notification.service';

@Injectable()
export class NotificationDispatchAdapter implements NotificationDispatchPort {
  constructor(
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly pushService: PushNotificationService
  ) {}

  async dispatch(notification: Notification): Promise<void> {
    switch (notification.channel) {
      case NotificationChannel.EMAIL:
        await this.emailService.sendEmail(
          notification.recipient,
          notification.payload['subject'] || 'No Subject',
          notification.payload['body'] || ''
        );
        break;
      case NotificationChannel.SMS:
        await this.smsService.sendSms(notification.recipient, notification.payload['body'] || '');
        break;
      case NotificationChannel.PUSH:
        await this.pushService.sendPushNotification(
          notification.recipient,
          notification.payload['title'] || 'No Title',
          notification.payload['body'] || '',
          notification.payload['data']
        );
        break;
      default:
        throw new Error(`Unsupported channel: ${notification.channel}`);
    }
  }
}
