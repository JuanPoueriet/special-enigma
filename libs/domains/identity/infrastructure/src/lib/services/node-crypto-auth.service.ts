import { Injectable } from '@nestjs/common';
import { AuthService } from '@virteex-erp/identity-domain';
import * as crypto from 'crypto';

@Injectable()
export class NodeCryptoAuthService implements AuthService {
  private readonly secret: string;

  constructor() {
    this.secret = process.env['JWT_SECRET'] || '';
    if (!this.secret) {
      throw new Error('JWT_SECRET is not defined in environment variables. Authentication service cannot start.');
    }
    if (this.secret.length < 32) {
      console.warn('JWT_SECRET is too short (< 32 chars). Consider using a stronger secret.');
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

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':');
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key === derivedKey.toString('hex'));
      });
    });
  }

  async generateToken(payload: any): Promise<string> {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    // Ensure payload has exp claim
    const enrichedPayload = {
      ...payload,
      exp: payload.exp || Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour default
    };
    const encodedPayload = Buffer.from(JSON.stringify(enrichedPayload)).toString('base64url');

    const signature = crypto
      .createHmac('sha256', this.secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
}
