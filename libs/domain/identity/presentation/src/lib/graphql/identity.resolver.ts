import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { LoginUserUseCase, InitiateSignupUseCase, VerifySignupUseCase, CompleteOnboardingUseCase } from '@virtex/domain-identity-application';
import { CookiePolicyService } from '@virtex/kernel-auth';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response';
import { InitiateSignupInput, VerifySignupInput, CompleteOnboardingInput } from './dto/signup.input';
import { InitiateSignupResponse, VerifySignupResponse } from './dto/signup.response';

@Resolver()
export class IdentityResolver {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly initiateSignupUseCase: InitiateSignupUseCase,
    private readonly verifySignupUseCase: VerifySignupUseCase,
    private readonly completeOnboardingUseCase: CompleteOnboardingUseCase,
    private readonly cookiePolicyService: CookiePolicyService
  ) {}

  @Query(() => String)
  identityHealthCheck(): string {
    return 'Identity Service is running';
  }

  @Mutation(() => LoginResponse)
  async login(
      @Args('input') input: LoginInput,
      @Context() context: any
  ): Promise<LoginResponse> {
      const req = context.req || context.request;
      const ip = req?.ip || req?.connection?.remoteAddress || '127.0.0.1';
      const userAgent = req?.headers?.['user-agent'] || 'unknown';

      const result = await this.loginUserUseCase.execute(input, { ip, userAgent });

      const res = context.res || context.response;
      if (res && result.accessToken && result.refreshToken) {
          this.cookiePolicyService.setAuthCookies(res, result.accessToken, result.refreshToken);
          // Standardize: If cookies are set, we don't return tokens in the body for browser clients.
          // This aligns with the "browser cookie-only" policy.
          return {
              expiresIn: result.expiresIn,
              mfaRequired: result.mfaRequired,
              tempToken: result.tempToken
          };
      }

      return result;
  }

  @Mutation(() => InitiateSignupResponse)
  async initiateSignup(@Args('input') input: InitiateSignupInput): Promise<InitiateSignupResponse> {
      await this.initiateSignupUseCase.execute(input);
      return { success: true, message: 'Verification code sent' };
  }

  @Mutation(() => VerifySignupResponse)
  async verifySignup(@Args('input') input: VerifySignupInput): Promise<VerifySignupResponse> {
      const result = await this.verifySignupUseCase.execute({ email: input.email, otp: input.code });
      return { success: true, accessToken: result.onboardingToken };
  }

  @Mutation(() => LoginResponse)
  async completeOnboarding(
      @Args('input') input: CompleteOnboardingInput,
      @Context() context: any
  ): Promise<LoginResponse> {
      const req = context.req || context.request;
      const ip = req?.ip || req?.connection?.remoteAddress || '127.0.0.1';
      const userAgent = req?.headers?.['user-agent'] || 'unknown';

      const result = await this.completeOnboardingUseCase.execute(input, { ip, userAgent });

      const res = context.res || context.response;
      if (res && result.accessToken && result.refreshToken) {
          this.cookiePolicyService.setAuthCookies(res, result.accessToken, result.refreshToken);
          return {
              expiresIn: result.expiresIn
          };
      }

      return {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          expiresIn: result.expiresIn
      };
  }
}
