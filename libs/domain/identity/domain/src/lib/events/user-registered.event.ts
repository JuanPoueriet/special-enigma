import { User } from '../iam/user.entity';

export class UserRegisteredEvent {
  constructor(public readonly user: User) {}
}
