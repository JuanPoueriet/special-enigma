import { Injectable } from '@nestjs/common';
import { generateSecret, generateSync, verifySync, NobleCryptoPlugin, ScureBase32Plugin } from 'otplib';

@Injectable()
export class MfaHelperService {
  private readonly crypto = new NobleCryptoPlugin();
  private readonly base32 = new ScureBase32Plugin();

  generateSecret(): string {
    return generateSecret({ base32: this.base32, crypto: this.crypto });
  }

  generateToken(secret: string): string {
    return generateSync({ secret, crypto: this.crypto });
  }

  verifyToken(token: string, secret: string): boolean {
    try {
      const result = verifySync({ token, secret, crypto: this.crypto });
      return result.valid;
    } catch {
      return false;
    }
  }
}
