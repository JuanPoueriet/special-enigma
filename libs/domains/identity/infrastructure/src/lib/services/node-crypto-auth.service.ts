import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@virteex/identity-domain';
import * as jwt from 'jsonwebtoken';
import { authenticator } from '@otplib/preset-default';
import * as crypto from 'crypto';

interface JwtPayload {
  [key: string]: unknown;
}

@Injectable()
export class NodeCryptoAuthService implements AuthService {
  private readonly secret: string;
  private readonly encryptionKey: Buffer;
  private readonly algorithm = 'aes-256-gcm';

  constructor() {
    this.secret = process.env['JWT_SECRET'] || '';
    if (!this.secret) {
      // In production, this should throw. For local dev without env, we can warn but for security compliance we should enforce it.
      // However, to unblock local run without .env, I will check NODE_ENV.
      if (process.env['NODE_ENV'] === 'production') {
          throw new Error('JWT_SECRET is not defined in environment variables.');
      } else {
          console.warn('WARNING: JWT_SECRET not set, using insecure default for development only.');
          this.secret = 'dev_secret_key_123';
      }
    }
    const mfaKey = process.env['MFA_ENCRYPTION_KEY'] || this.secret;
    // Derive a 32-byte key
    this.encryptionKey = crypto.scryptSync(mfaKey, 'salt', 32);
  }

  async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(`${salt}:${derivedKey.toString('hex')}`);
      });
    });
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = storedHash.split(':');
      if (!salt || !key) return resolve(false);

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key === derivedKey.toString('hex'));
      });
    });
  }

  async generateToken(payload: any): Promise<string> {
    const expiration = process.env['JWT_EXPIRATION'] || '1h';
    return jwt.sign(payload, this.secret, { expiresIn: expiration } as jwt.SignOptions);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  generateMfaSecret(): string {
    return authenticator.generateSecret();
  }

  verifyMfaToken(token: string, secret: string): boolean {
    try {
      return authenticator.check(token, secret);
    } catch {
      return false;
    }
  }

  async encrypt(text: string): Promise<string> {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${encrypted}:${authTag.toString('hex')}`;
  }

  async decrypt(text: string): Promise<string> {
    const parts = text.split(':');
    if (parts.length !== 3) throw new Error('Invalid encrypted text format');
    const [ivHex, encryptedHex, authTagHex] = parts;

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
