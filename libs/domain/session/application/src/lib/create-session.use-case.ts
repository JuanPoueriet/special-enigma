
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CreateSessionUseCase {
  constructor(
    @Inject('SessionRepository') private readonly repository: any,
  ) {}

  async execute(data: any) {
    const session = {
      id: "session-uuid",
      userId: data.userId,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
      tenantId: data.tenantId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
      isActive: true,
    };
    await this.repository.save(session);
    return session;
  }
}
