import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from '@virtex/domain-identity-domain';
import { JwtTokenService, SecretManagerService, MfaHelperService } from '@virtex/kernel-auth';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as argon2 from 'argon2';

@Injectable()
export class KeycloakAuthService implements AuthService {
  private readonly logger = new Logger(KeycloakAuthService.name);
  private readonly clientSecret: string;
  private readonly issuer: string;
  private readonly encryptionKey: Buffer;
  private readonly algorithm = 'aes-256-gcm';

  constructor(
    private secretManager: SecretManagerService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly mfaHelper: MfaHelperService
  ) {
      this.clientSecret = this.secretManager.getSecret('KEYCLOAK_CLIENT_SECRET');
      this.issuer = this.secretManager.getSecret('KEYCLOAK_ISSUER');

      if (!this.clientSecret || !this.issuer) {
          throw new Error('Keycloak configuration (KEYCLOAK_CLIENT_SECRET, KEYCLOAK_ISSUER) is missing');
      }

      const mfaKey = this.secretManager.getSecret('MFA_ENCRYPTION_KEY', this.clientSecret);
      const salt = this.secretManager.getSecret('ENCRYPTION_SALT');
      if (!salt) {
          throw new Error('ENCRYPTION_SALT must be configured');
      }
      this.encryptionKey = crypto.scryptSync(mfaKey, salt, 32);
  }

  async hashPassword(password: string): Promise<string> {
      return argon2.hash(password, {
          type: argon2.argon2id,
          memoryCost: 2 ** 16, // 64 MB
          timeCost: 3,
          parallelism: 1,
      });
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
      try {
          return await argon2.verify(hash, password);
      } catch (err) {
          return false;
      }
  }

  async generateToken(payload: any, options?: { tokenType?: "access" | "refresh" | "service" | "plugin" | "stepup"; expiresIn?: string | number; audience?: string; issuer?: string; subject?: string }): Promise<string> {
      return this.jwtTokenService.issueToken(payload, {
          tokenType: options?.tokenType ?? "service",
          expiresIn: options?.expiresIn ?? "1h",
          issuer: options?.issuer ?? this.issuer,
          audience: options?.audience,
          subject: options?.subject
      });
  }

  async verifyToken(token: string, type: "access" | "refresh" | "service" | "plugin" | "stepup" = "access"): Promise<any> {
      try {
          return await this.jwtTokenService.verifyToken(token, type);
      } catch (e: any) {
          this.logger.error(`Token verification failed: ${e.message}`);
          throw new UnauthorizedException(e.message || 'Invalid or expired token');
      }
  }

  generateMfaSecret(): string {
    return this.mfaHelper.generateSecret();
  }

  verifyMfaToken(token: string, secret: string): boolean {
    return this.mfaHelper.verifyToken(token, secret);
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

  hashToken(token: string): string {
      return crypto.createHash('sha256').update(token).digest('hex');
  }
}
