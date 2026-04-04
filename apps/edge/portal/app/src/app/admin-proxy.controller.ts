import {
  Controller,
  Req,
  Get,
  Param,
  Query,
  Head,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';
import { IdentityProxyService } from './identity-proxy.service';
import { Public } from '@virtex/kernel-auth';

@Controller('v1')
export class AdminProxyController {
  constructor(private readonly identityProxy: IdentityProxyService) {}

  // --- Admin ---

  @Get('admin/tenants')
  async listTenants(@Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.listTenants(metadata);
  }

  // --- Localization ---

  @Get('localization/config/:code')
  async getConfig(@Param('code') code: string, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getLocalizationConfig(code, metadata);
  }

  @Get('localization/lookup/:taxId')
  async lookup(
    @Param('taxId') taxId: string,
    @Query('country') country: string,
    @Req() req: Request,
  ) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.localizationLookup(
      taxId,
      country,
      metadata,
    );
  }

  // --- Common ---

  @Public()
  @Head('common/users/exists')
  @HttpCode(HttpStatus.OK)
  async checkUserExists(@Query('email') email: string, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.checkUserExists(email, metadata);
    if (!result.exists) throw new NotFoundException('User not found');
  }

  @Public()
  @Head('common/organizations/exists')
  @HttpCode(HttpStatus.OK)
  async checkOrganizationExists(
    @Query('taxId') taxId: string,
    @Req() req: Request,
  ) {
    const metadata = this.identityProxy.getMetadata(req);
    const result = await this.identityProxy.checkOrganizationExists(
      taxId,
      metadata,
    );
    if (!result.exists) throw new NotFoundException('Organization not found');
  }
}
