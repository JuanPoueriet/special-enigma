
import { Controller, Post, Body, HttpCode, HttpStatus, Req, Res, Logger } from '@nestjs/common';
import { AuthnCredentialServiceClient } from '@virtex/domain-api-access-gateway-infrastructure';
import { LoginUserDto } from '@virtex/domain-authn-credential-contracts';
import { Request, Response } from 'express';
import { Public } from '@virtex/kernel-auth';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Auth Session')
@Controller('auth')
export class AuthSessionController {
  private readonly logger = new Logger(AuthSessionController.name);

  constructor(
    private readonly authnServiceClient: AuthnCredentialServiceClient,
  ) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    this.logger.log(`Forwarding login request for ${dto.email} to authn-credential-service`);
    const result = await this.authnServiceClient.login(dto);

    if (result.mfaRequired) {
        return {
            mfaRequired: true,
            tempToken: result.tempToken
        };
    }

    // In a real gateway scenario, we would set cookies here after receiving tokens from the token service
    return {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn,
        mfaRequired: false
    };
  }
}
