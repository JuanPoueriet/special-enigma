import { Notification } from '../entities/notification.entity';

export const NOTIFICATION_REPOSITORY_PORT = Symbol('NOTIFICATION_REPOSITORY_PORT');

export interface NotificationRepositoryPort {
  save(notification: Notification): Promise<void>;
}
