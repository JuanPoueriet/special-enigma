
import { Injectable, Inject } from '@nestjs/common';

export interface TokenRequest {
  userId: string;
  email: string;
  role: string;
  tenantId: string;
  riskScore: number;
}

@Injectable()
export class IssueTokenUseCase {
  constructor(
    @Inject('TokenService') private readonly tokenService: any,
  ) {}

  async execute(request: TokenRequest) {
    const accessToken = await this.tokenService.generateAccessToken({
      sub: request.userId,
      email: request.email,
      role: request.role,
      tenantId: request.tenantId,
      riskScore: request.riskScore
    });

    const refreshToken = await this.tokenService.generateRefreshToken({
      sub: request.userId,
      tenantId: request.tenantId
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60 // 15 minutes
    };
  }
}
