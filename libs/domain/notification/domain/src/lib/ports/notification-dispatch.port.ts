import { Notification } from '../entities/notification.entity';

export const NOTIFICATION_DISPATCH_PORT = Symbol('NOTIFICATION_DISPATCH_PORT');

export interface NotificationDispatchPort {
  dispatch(notification: Notification): Promise<void>;
}
