import { User } from '../entities/user.entity';

export abstract class NotificationService {
  abstract sendWelcomeEmail(user: User): Promise<void>;
}
