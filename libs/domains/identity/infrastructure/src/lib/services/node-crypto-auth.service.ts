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

  constructor() {
    this.secret = process.env['JWT_SECRET'] || '';
    if (!this.secret) {
      throw new Error('JWT_SECRET is not defined in environment variables.');
    }
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
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
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
}
