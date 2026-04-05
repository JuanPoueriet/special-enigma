
import { v4 as uuidv4 } from 'uuid';

export class UserIdentity {
  id: string = uuidv4();
  email!: string;
  firstName!: string;
  lastName!: string;
  country!: string;
  timezone!: string;
  phone?: string;
  avatarUrl?: string;
  preferredLanguage = 'es';

  // Account Lifecycle
  isActive = true;
  status = 'PENDING'; // 'ACTIVE', 'BLOCKED', 'SUSPENDED'

  // Tenant Context
  companyId!: string;
  role = 'user'; // 'admin', 'user', etc.

  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(email: string, firstName: string, lastName: string, country: string, companyId: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.companyId = companyId;
    this.timezone = 'UTC';
  }

  updateProfile(firstName?: string, lastName?: string, phone?: string, preferredLanguage?: string): void {
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (phone) this.phone = phone;
    if (preferredLanguage) this.preferredLanguage = preferredLanguage;
  }

  activate(): void {
    this.isActive = true;
    this.status = 'ACTIVE';
  }
}
