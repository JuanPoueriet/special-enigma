import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from '@virteex/domain-notification-application';
import { NotificationChannel } from '@virteex/domain-notification-domain';

@Controller()
export class NotificationConsumer {
  private readonly logger = new Logger(NotificationConsumer.name);

  constructor(
    private readonly notificationService: NotificationService
  ) {}

  @EventPattern('notification.send')
  async handleNotification(@Payload() data: { to: string; subject: string; body: string; tenantId: string }) {
    this.logger.log(`Received notification request: ${JSON.stringify(data)}`);
    await this.notificationService.createNotification({
      tenantId: data.tenantId || 'default',
      channel: NotificationChannel.EMAIL,
      recipient: data.to,
      payload: { subject: data.subject, body: data.body },
    });
  }

  @EventPattern('notification.sms.send')
  async handleSmsNotification(@Payload() data: { to: string; body: string; tenantId: string }) {
    this.logger.log(`Received SMS notification request: ${JSON.stringify(data)}`);
    await this.notificationService.createNotification({
      tenantId: data.tenantId || 'default',
      channel: NotificationChannel.SMS,
      recipient: data.to,
      payload: { body: data.body },
    });
  }

  @EventPattern('notification.push.send')
  async handlePushNotification(@Payload() data: { token: string; title: string; body: string; tenantId: string; data?: any }) {
    this.logger.log(`Received Push notification request: ${JSON.stringify(data)}`);
    await this.notificationService.createNotification({
      tenantId: data.tenantId || 'default',
      channel: NotificationChannel.PUSH,
      recipient: data.token,
      payload: { title: data.title, body: data.body, data: data.data },
    });
  }

  @EventPattern('user.registered')
  async handleUserRegistered(@Payload() data: { email: string; name: string; tenantId: string }) {
    this.logger.log(`User registered: ${data.email}`);
    await this.notificationService.createNotification({
      tenantId: data.tenantId || 'default',
      channel: NotificationChannel.EMAIL,
      recipient: data.email,
      templateId: 'welcome',
      templateVersion: '1.0.0',
      payload: { name: data.name },
    });
  }
}
