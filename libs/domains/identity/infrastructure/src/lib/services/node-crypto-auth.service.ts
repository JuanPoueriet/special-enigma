import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@virteex/identity-domain';
import * as crypto from 'crypto';
import { authenticator } from 'otplib';

interface JwtPayload {
  [key: string]: unknown;
  exp?: number;
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
      if (!salt || !key) return resolve(false); // Invalid hash format

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key === derivedKey.toString('hex'));
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async generateToken(payload: any): Promise<string> {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');

    const typedPayload = payload as JwtPayload;

    // Ensure payload has exp claim
    const enrichedPayload = {
      ...typedPayload,
      exp: typedPayload.exp || Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour default if not set
    };

    const encodedPayload = Buffer.from(JSON.stringify(enrichedPayload)).toString('base64url');

    const signature = crypto
      .createHmac('sha256', this.secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async verifyToken(token: string): Promise<any> {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    if (!encodedHeader || !encodedPayload || !signature) {
      throw new UnauthorizedException('Invalid token format');
    }

    const expectedSignature = crypto
      .createHmac('sha256', this.secret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

    if (signature !== expectedSignature) {
      throw new UnauthorizedException('Invalid token signature');
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString()) as JwtPayload;

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new UnauthorizedException('Token expired');
    }

    return payload;
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
