import { Injectable, Inject, Logger } from '@nestjs/common';
import { SessionValidator, SESSION_VALIDATOR } from '@virtex/kernel-auth';
import { SessionRepository, CachePort } from '@virtex/domain-identity-domain';

@Injectable()
export class IdentitySessionValidator implements SessionValidator {
  private readonly logger = new Logger(IdentitySessionValidator.name);

  constructor(
    @Inject(SessionRepository) private readonly sessionRepository: SessionRepository,
    @Inject(CachePort) private readonly cachePort: CachePort,
  ) {}

  async isValid(sessionId: string): Promise<boolean> {
    try {
      // 1. Check Redis first (fast path)
      const cachedStatus = await this.cachePort.get(`session:${sessionId}`);
      if (cachedStatus === 'valid') {
        return true;
      }
      if (cachedStatus === 'revoked') {
        return false;
      }

      // 2. Fallback to Database (fail-closed robustness)
      this.logger.debug(`Session ${sessionId} not in cache, checking database...`);
      const session = await this.sessionRepository.findById(sessionId);

      if (!session || !session.isActive || session.expiresAt < new Date()) {
        // Cache negative result for a short time if it was found inactive
        await this.cachePort.set(`session:${sessionId}`, 'revoked', 60);
        return false;
      }

      // Cache positive result
      const ttl = Math.floor((session.expiresAt.getTime() - Date.now()) / 1000);
      if (ttl > 0) {
        await this.cachePort.set(`session:${sessionId}`, 'valid', Math.min(ttl, 3600));
      }

      return true;
    } catch (error) {
      this.logger.error(`Error validating session ${sessionId}: ${(error as Error).message}`);
      // Fail-closed in production, but we can decide policy here.
      // Since it's a security check, we return false to be safe.
      return false;
    }
  }
}
