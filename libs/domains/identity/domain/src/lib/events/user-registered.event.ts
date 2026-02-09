import { User } from '@virteex/identity-domain/lib/entities/user.entity';

export class UserRegisteredEvent {
  constructor(public readonly user: User) {}
}
