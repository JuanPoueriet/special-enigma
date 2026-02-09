import { User } from '@virteex/identity-domain/lib/entities/user.entity';

export abstract class NotificationService {
  abstract sendWelcomeEmail(user: User): Promise<void>;
}
