import { Module } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { PushNotificationService } from './services/push-notification.service';
import { NotificationDispatchAdapter } from './adapters/notification-dispatch.adapter';
import { NotificationRepositoryAdapter } from './adapters/notification-repository.adapter';
import { NOTIFICATION_DISPATCH_PORT, NOTIFICATION_REPOSITORY_PORT } from '@virtex/domain-notification-domain';

@Module({
  providers: [
    EmailService,
    SmsService,
    PushNotificationService,
    {
      provide: NOTIFICATION_DISPATCH_PORT,
      useClass: NotificationDispatchAdapter,
    },
    {
      provide: NOTIFICATION_REPOSITORY_PORT,
      useClass: NotificationRepositoryAdapter,
    },
  ],
  exports: [NOTIFICATION_DISPATCH_PORT, NOTIFICATION_REPOSITORY_PORT],
})
export class NotificationInfrastructureModule {}
