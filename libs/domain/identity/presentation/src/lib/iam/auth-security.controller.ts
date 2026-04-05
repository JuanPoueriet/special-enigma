import { Controller, Post, Get, Body, HttpCode, HttpStatus, Req, Logger, UseGuards } from '@nestjs/common';
import {
    CheckSecurityContextUseCase
} from '@virtex/domain-identity-application';
import { Request } from 'express';
import { Public, JwtAuthGuard } from '@virtex/kernel-auth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RequestContextService } from '../services/request-context.service';

@ApiTags('Auth Security')
@Controller('auth')
@UseGuards(ThrottlerGuard, JwtAuthGuard)
export class AuthSecurityController {
  private readonly logger = new Logger(AuthSecurityController.name);

  constructor(
    private readonly checkSecurityContextUseCase: CheckSecurityContextUseCase,
    private readonly requestContextService: RequestContextService,
  ) {}

  @Public()
  @Post('security/context-check')
  @HttpCode(HttpStatus.OK)
  async checkContext(@Body() body: { urlCountry: string }, @Req() req: Request) {
      const ip = this.requestContextService.extractIp(req);
      return this.checkSecurityContextUseCase.execute({
          urlCountry: body.urlCountry,
          ip
      });
  }

  @Public()
  @Get('location')
  @ApiOperation({ summary: 'Get client location' })
  async getLocation(@Req() req: Request): Promise<any> {
    try {
      const ip = this.requestContextService.extractIp(req);
      return await this.requestContextService.getGeoLocation(ip);
    } catch (error) {
      this.logger.error('Error fetching location:', error);
      return { country_code: null };
    }
  }
}
