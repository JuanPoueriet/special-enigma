import { Controller, Post, Body, HttpCode, HttpStatus, Req } from '@nestjs/common';
import {
  RegisterUserDto, LoginUserDto, VerifyMfaDto,
  RegisterUserUseCase, LoginUserUseCase, VerifyMfaUseCase,
  LoginResponseDto
} from '@virteex/identity-application';
import { User } from '@virteex/identity-domain';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly verifyMfaUseCase: VerifyMfaUseCase
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterUserDto, @Req() req: Request): Promise<User> {
    const context = {
      ip: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown',
      country: undefined // Could be extracted from headers like 'cf-ipcountry'
    };
    return this.registerUserUseCase.execute(dto, context);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto, @Req() req: Request): Promise<LoginResponseDto> {
    const context = {
      ip: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    };
    return this.loginUserUseCase.execute(dto, context);
  }

  @Post('verify-mfa')
  @HttpCode(HttpStatus.OK)
  async verifyMfa(@Body() dto: VerifyMfaDto, @Req() req: Request): Promise<LoginResponseDto> {
    const context = {
        ip: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown'
    };
    return this.verifyMfaUseCase.execute(dto, context);
  }
}
