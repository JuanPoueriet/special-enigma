import { v4 } from 'uuid';

export enum NotificationStatus {
  ACCEPTED = 'accepted',
  RENDERED = 'rendered',
  QUEUED_PROVIDER = 'queued_provider',
  SENT_PROVIDER = 'sent_provider',
  DELIVERED = 'delivered',
  OPENED = 'opened',
  BOUNCED = 'bounced',
  COMPLAINED = 'complained',
  FAILED_TERMINAL = 'failed_terminal',
}

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  WEBHOOK = 'webhook',
  IN_APP = 'in_app',
}

export class Notification {
  id: string = v4();
  tenantId!: string;
  userId?: string;
  channel!: NotificationChannel;
  status: NotificationStatus = NotificationStatus.ACCEPTED;
  templateId?: string;
  templateVersion?: string;
  payload!: Record<string, any>;
  recipient!: string;
  idempotencyKey?: string;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  sentAt?: Date;
  deliveredAt?: Date;
  providerMessageId?: string;
  providerName?: string;
  history: NotificationAttempt[] = [];
}

export class NotificationAttempt {
  id: string = v4();
  notification!: Notification;
  status!: NotificationStatus;
  reason?: string;
  occurredAt: Date = new Date();
  providerResponse?: Record<string, any>;
}
