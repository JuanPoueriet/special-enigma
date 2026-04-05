import { Controller, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  InitiateSignupUseCase,
  VerifySignupUseCase,
  CompleteOnboardingUseCase,
  GetOnboardingStatusUseCase,
} from '@virtex/domain-identity-application';
import { GrpcAuthGuard } from '../guards/grpc-auth.guard';

@Controller()
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class OnboardingGrpcController {
  constructor(
    private readonly initiateSignupUseCase: InitiateSignupUseCase,
    private readonly verifySignupUseCase: VerifySignupUseCase,
    private readonly completeOnboardingUseCase: CompleteOnboardingUseCase,
    private readonly getOnboardingStatusUseCase: GetOnboardingStatusUseCase,
  ) {}

  @GrpcMethod('IdentityService', 'InitiateSignup')
  async initiateSignup(data: any) {
    await this.initiateSignupUseCase.execute(data);
    return {};
  }

  @GrpcMethod('IdentityService', 'VerifySignup')
  async verifySignup(data: any) {
    const result = await this.verifySignupUseCase.execute({
      email: data.email,
      otp: data.code,
    });
    return {
      onboarding_token: result.onboardingToken,
    };
  }

  @GrpcMethod('IdentityService', 'CompleteOnboarding')
  async completeOnboarding(data: any) {
    const result = await this.completeOnboardingUseCase.execute(
      {
        onboardingToken: data.onboarding_token,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
        companyName: data.company_name,
        taxId: data.tax_id,
        country: data.country,
        regime: data.regime,
        fiscalRegionId: data.fiscal_region_id,
        industry: data.industry,
        recaptchaToken: data.recaptcha_token,
      },
      data.context
    );
    return {
      access_token: result.accessToken,
      refresh_token: result.refreshToken,
      expires_in: result.expiresIn,
    };
  }

  @UseGuards(GrpcAuthGuard)
  @GrpcMethod('IdentityService', 'GetOnboardingStatus')
  async getOnboardingStatus(data: any) {
    const result = await this.getOnboardingStatusUseCase.execute(data.user.sub);
    return {
      status: result.status,
      is_completed: result.isCompleted,
    };
  }
}
