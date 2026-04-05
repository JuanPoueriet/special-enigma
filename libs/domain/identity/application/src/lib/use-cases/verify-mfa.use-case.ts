import { DomainException } from '@virtex/shared-util-server-server-config';
import { Injectable, Inject } from '@nestjs/common';
import { VerifyMfaDto, LoginResponseDto } from '@virtex/domain-identity-contracts';
import { UserRepository, AuditLogRepository, AuditLog, AuthService } from '@virtex/domain-identity-domain';
import { TokenGenerationService } from '../services/token-generation.service';

export interface VerifyMfaContext {
  ip: string;
  userAgent: string;
}

@Injectable()
export class VerifyMfaUseCase {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(AuditLogRepository) private readonly auditLogRepository: AuditLogRepository,
    @Inject(TokenGenerationService) private readonly tokenGenerationService: TokenGenerationService
  ) {}

  async execute(dto: VerifyMfaDto, context: VerifyMfaContext = { ip: 'unknown', userAgent: 'unknown' }): Promise<LoginResponseDto> {
    // 1. Validate Token
    let payload: any;
    try {
        payload = await this.authService.verifyToken(dto.tempToken);
    } catch (e) {
        throw new DomainException('Invalid or expired token', 'UNAUTHORIZED');
    }

    if (!payload.partial || !payload.sub || payload.typ !== 'virtex+stepup') {
        throw new DomainException('Invalid token type', 'UNAUTHORIZED');
    }

    const userId = payload.sub;
    const user = await this.userRepository.findById(userId); // Assuming findById exists in Repo port

    if (!user) {
        throw new DomainException('User not found', 'UNAUTHORIZED');
    }

    // 2. Validate Code
    if (!user.mfaSecret) {
        throw new DomainException('MFA not configured for this account.', 'UNAUTHORIZED');
    }

    let isValid = false;
    const decryptedSecret = await this.authService.decrypt(user.mfaSecret);
    isValid = this.authService.verifyMfaToken(dto.code, decryptedSecret);

    // If TOTP fails, check backup codes
    if (!isValid && user.backupCodes && user.backupCodes.length > 0) {
      const inputHash = this.authService.hashToken(dto.code);
      const backupCodeIndex = user.backupCodes.findIndex(
        (bc) => !bc.isUsed && bc.hash === inputHash && (!bc.expiresAt || new Date(bc.expiresAt) > new Date())
      );

      if (backupCodeIndex !== -1) {
        isValid = true;
        user.backupCodes[backupCodeIndex].isUsed = true;
        (user.backupCodes[backupCodeIndex] as any).usedAt = new Date();
        await this.userRepository.update(user);
        await this.auditLogRepository.save(new AuditLog('BACKUP_CODE_USED', user.id, { ip: context.ip }));
      }
    }

    if (!isValid) {
        await this.auditLogRepository.save(new AuditLog('MFA_FAILED', user.id, { ip: context.ip }));
        throw new DomainException('Invalid verification code', 'UNAUTHORIZED');
    }

    // 3. Create Session and Generate Tokens
    const riskScore = payload.riskScore || 0;

    const { accessToken, refreshToken, expiresIn, session } = await this.tokenGenerationService.createSessionAndTokens(user, context, riskScore, true);

    await this.auditLogRepository.save(new AuditLog('MFA_SUCCESS', user.id, { ip: context.ip, sessionId: session.id }));

    return {
      accessToken,
      refreshToken,
      expiresIn,
      mfaRequired: false
    };
  }
}
