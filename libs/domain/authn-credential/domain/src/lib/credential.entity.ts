
import { v4 as uuidv4 } from 'uuid';

export class Credential {
  id: string = uuidv4();
  userId!: string;
  email!: string;
  passwordHash!: string;

  // MFA Factors
  mfaEnabled = false;
  mfaSecret?: string;
  backupCodes: {
    hash: string;
    isUsed: boolean;
    createdAt: Date;
    expiresAt?: Date;
  }[] = [];

  // Reset Password fields
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;

  failedLoginAttempts = 0;
  lockedUntil?: Date;

  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(userId: string, email: string, passwordHash: string) {
    this.userId = userId;
    this.email = email;
    this.passwordHash = passwordHash;
  }
}
