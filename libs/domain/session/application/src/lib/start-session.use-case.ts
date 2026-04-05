
import { Injectable, Inject } from '@nestjs/common';
import { Session } from '@virtex/domain-session-domain';

export interface StartSessionRequest {
  userId: string;
  tenantId: string;
  ipAddress?: string;
  userAgent?: string;
  deviceFingerprint?: string;
}

@Injectable()
export class StartSessionUseCase {
  constructor(
    @Inject('SessionRepository') private readonly sessionRepository: any,
  ) {}

  async execute(request: StartSessionRequest) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = new Session(request.userId, request.tenantId, expiresAt);
    session.ipAddress = request.ipAddress;
    session.userAgent = request.userAgent;
    session.deviceFingerprint = request.deviceFingerprint;

    await this.sessionRepository.save(session);
    return session;
  }
}
