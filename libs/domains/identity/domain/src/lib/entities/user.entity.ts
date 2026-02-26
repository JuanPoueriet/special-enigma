import type { Company } from './company.entity';

export class User {
  id!: string;
  email!: string;
  passwordHash!: string;
  firstName!: string;
  lastName!: string;
  country!: string;
  timezone!: string;
  phone?: string;
  avatarUrl?: string;
  role = 'user'; // 'admin', 'user', etc.
  company!: Company;
  isActive = true;
  status = 'PENDING';
  invitationToken?: string;
  invitationExpiresAt?: Date;

  // New fields for Authentication Security
  riskScore = 0; // 0-100, dynamic or static baseline
  mfaEnabled = false;
  mfaSecret?: string;
  lastLoginAt?: Date;
  failedLoginAttempts = 0;
  lockedUntil?: Date;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(
    id: string,
    email: string,
    passwordHash: string,
    firstName: string,
    lastName: string,
    country: string,
    company: Company
  ) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.company = company;
    this.timezone = 'UTC';
  }

  updateProfile(firstName?: string, lastName?: string, phone?: string): void {
    if (firstName) this.firstName = firstName;
    if (lastName) this.lastName = lastName;
    if (phone) this.phone = phone;
  }

  activate(): void {
    this.isActive = true;
    this.status = 'ACTIVE';
  }

  registerFailedLogin(): boolean {
    this.failedLoginAttempts += 1;
    if (this.failedLoginAttempts >= 3) {
      this.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins lock
      return true;
    }
    return false;
  }

  isLocked(): boolean {
    return !!(this.lockedUntil && this.lockedUntil > new Date());
  }

  registerLoginSuccess(riskScore: number): void {
    this.failedLoginAttempts = 0;
    this.lockedUntil = undefined;
    this.lastLoginAt = new Date();
    this.riskScore = riskScore;
  }

  shouldRequireMfa(riskScore: number): boolean {
    return this.mfaEnabled || riskScore > 60;
  }
}
