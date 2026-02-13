import { Controller, Post, Get, Body, HttpCode, HttpStatus, Req } from '@nestjs/common';
import {
  RegisterUserDto, LoginUserDto, VerifyMfaDto,
  RegisterUserUseCase, LoginUserUseCase, VerifyMfaUseCase,
  LoginResponseDto
} from '@virteex/identity-application';
import { User } from '@virteex/identity-domain';
import { Request } from 'express';
import { Public } from '@virteex/auth';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly verifyMfaUseCase: VerifyMfaUseCase
  ) {}

  @Public()
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

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto, @Req() req: Request): Promise<LoginResponseDto> {
    const context = {
      ip: req.ip || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    };
    return this.loginUserUseCase.execute(dto, context);
  }

  @Public()
  @Post('verify-mfa')
  @HttpCode(HttpStatus.OK)
  async verifyMfa(@Body() dto: VerifyMfaDto, @Req() req: Request): Promise<LoginResponseDto> {
    const context = {
        ip: req.ip || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown'
    };
    return this.verifyMfaUseCase.execute(dto, context);
  }

  @Public()
  @Get('location')
  @ApiOperation({ summary: 'Get client location' })
  async getLocation(@Req() req: Request): Promise<any> {
    try {
      // In a real production environment, we might want to pass the client IP
      // to the service if we are behind a proxy, e.g. https://ipapi.co/{ip}/json/
      // For now, we just proxy the request to avoid CORS and hide API key if we had one.
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
         console.warn('Failed to fetch location from ipapi.co');
         return { country_code: 'US' };
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching location:', error);
      return { country_code: 'US' };
    }
  }
}
