import {
  Controller,
  Req,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { IdentityProxyService } from './identity-proxy.service';

@Controller('v1/profile')
export class ProfileProxyController {
  constructor(private readonly identityProxy: IdentityProxyService) {}

  @Get()
  async getMyProfile(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getUserProfile(user?.sub, metadata);
  }

  @Get('audit-logs')
  async getMyAuditLogs(@Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getUserAuditLogs(user?.sub, metadata);
  }

  @Post('update')
  async updateMyProfile(@Req() req: Request, @Body() dto: any) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.updateUserProfile(user?.sub, dto, metadata);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Req() req: Request, @UploadedFile() file: any) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.uploadAvatar(
      user?.sub,
      file.originalname,
      file.buffer,
      metadata,
    );
  }
}
