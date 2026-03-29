import { Injectable } from '@nestjs/common';

@Injectable()
export class DimensionValidator {
  private readonly keyRegex = /^[a-zA-Z0-9_]+$/;

  validateKey(key: string): boolean {
    return this.keyRegex.test(key);
  }

  ensureValidKey(key: string): void {
    if (!this.validateKey(key)) {
      throw new Error(`Invalid dimension key: ${key}`);
    }
  }
}
