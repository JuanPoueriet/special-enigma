
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LoginUserUseCase implements OnModuleInit {
  private identityProfileService: any;
  private riskService: any;
  private tokenService: any;

  constructor(
    @Inject('IDENTITY_PROFILE_SERVICE') private readonly identityClient: ClientGrpc,
    @Inject('RISK_ADAPTIVE_AUTH_SERVICE') private readonly riskClient: ClientGrpc,
    @Inject('TOKEN_SERVICE') private readonly tokenClient: ClientGrpc,
    @Inject('CredentialRepository') private readonly repository: any,
  ) {}

  onModuleInit() {
    this.identityProfileService = this.identityClient.getService<any>('IdentityProfileService');
    this.riskService = this.riskClient.getService<any>('RiskAdaptiveAuthService');
    this.tokenService = this.tokenClient.getService<any>('TokenService');
  }

  async execute(dto: any) {
    const credential = await this.repository.findByEmail(dto.email);
    if (!credential) throw new Error('Invalid credentials');

    // 1. Get Profile
    const profile = await firstValueFrom(this.identityProfileService.getUserProfile({ userId: credential.userId }));

    // 2. Calculate Risk
    const risk = await firstValueFrom(this.riskService.calculateRisk({ userId: credential.userId }));

    // 3. Issue Tokens
    const tokens = await firstValueFrom(this.tokenService.issueTokens({
      userId: credential.userId,
      email: profile.email,
      role: profile.role,
      tenantId: profile.companyId,
      riskScore: risk.score
    }));

    return tokens;
  }
}
