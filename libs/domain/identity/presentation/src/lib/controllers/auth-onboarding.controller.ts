import { Controller, Post, Get, Body, HttpCode, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import {
    InitiateSignupUseCase,
    VerifySignupUseCase,
    CompleteOnboardingUseCase,
    GetOnboardingStatusUseCase
} from '@virtex/domain-identity-application';
import {
    InitiateSignupDto,
    VerifySignupDto,
    CompleteOnboardingDto
} from '@virtex/domain-identity-contracts';
import { Request, Response } from 'express';
import { Public, JwtAuthGuard, CookiePolicyService } from '@virtex/kernel-auth';
import { ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { SessionGuard } from '../guards/session.guard';
import { RequestContextService } from '../services/request-context.service';

@ApiTags('Auth Onboarding')
@Controller('auth')
@UseGuards(ThrottlerGuard, JwtAuthGuard, SessionGuard)
export class AuthOnboardingController {
  constructor(
    private readonly initiateSignupUseCase: InitiateSignupUseCase,
    private readonly verifySignupUseCase: VerifySignupUseCase,
    private readonly completeOnboardingUseCase: CompleteOnboardingUseCase,
    private readonly getOnboardingStatusUseCase: GetOnboardingStatusUseCase,
    private readonly requestContextService: RequestContextService,
    private readonly cookiePolicyService: CookiePolicyService
  ) {}

  @Public()
  @Post('signup/initiate')
  @HttpCode(HttpStatus.OK)
  async initiateSignup(@Body() dto: InitiateSignupDto) {
      await this.initiateSignupUseCase.execute(dto);
      return { message: 'OTP sent' };
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('signup/verify')
  @HttpCode(HttpStatus.OK)
  async verifySignup(@Body() dto: VerifySignupDto) {
      return this.verifySignupUseCase.execute(dto);
  }

  @Public()
  @Post('signup/complete')
  @HttpCode(HttpStatus.CREATED)
  async completeOnboarding(@Body() dto: CompleteOnboardingDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
      const context = {
          ip: this.requestContextService.extractIp(req),
          userAgent: req.headers['user-agent'] || 'unknown'
      };
      const result = await this.completeOnboardingUseCase.execute(dto, context);

      this.cookiePolicyService.setAuthCookies(res, result.accessToken, result.refreshToken);

      return {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          expiresIn: result.expiresIn
      };
  }

  @Get('onboarding-status')
  async getOnboardingStatus(@Req() req: Request) {
      const user = (req as any).user;
      return this.getOnboardingStatusUseCase.execute(user.sub);
  }
}
