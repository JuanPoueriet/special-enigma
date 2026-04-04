import {
  Controller,
  Req,
  Post,
  Get,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import type { Request } from 'express';
import { IdentityProxyService } from './identity-proxy.service';

@Controller('v1/users')
export class UserProxyController {
  constructor(private readonly identityProxy: IdentityProxyService) {}

  @Get()
  async listUsers(
    @Req() req: Request,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('searchTerm') searchTerm?: string,
    @Query('statusFilter') statusFilter?: string,
    @Query('sortColumn') sortColumn?: string,
    @Query('sortDirection') sortDirection?: 'ASC' | 'DESC',
  ) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.listUsers(
      {
        page: Number(page),
        pageSize: Number(pageSize),
        searchTerm,
        statusFilter,
        sortColumn,
        sortDirection,
        tenantId: user?.tenantId,
      },
      metadata,
    );
  }

  @Get('job-titles')
  async getJobTitles(@Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.getJobTitles(metadata);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: any,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.updateUser(
      id,
      dto,
      user.tenantId,
      metadata,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.deleteUser(id, user.tenantId, metadata);
  }

  @Post('invite')
  async invite(@Req() req: Request, @Body() dto: any) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.inviteUser(dto, user?.sub, metadata);
  }

  @Post(':id/force-logout')
  async forceLogout(@Param('id') id: string, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.forceLogout(id, metadata);
  }

  @Post(':id/block-and-logout')
  async blockAndLogout(@Param('id') id: string, @Req() req: Request) {
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.blockAndLogout(id, metadata);
  }

  @Put(':id/status')
  async setUserStatus(
    @Param('id') id: string,
    @Body() body: { isOnline: boolean },
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.setUserStatus(
      id,
      body.isOnline,
      user.tenantId,
      metadata,
    );
  }

  @Post(':id/reset-password')
  async sendPasswordReset(@Param('id') id: string, @Req() req: Request) {
    const user = (req as any).user;
    const context = this.identityProxy.buildContext(req);
    const metadata = this.identityProxy.getMetadata(req);
    return await this.identityProxy.sendPasswordReset(
      id,
      user.tenantId,
      context,
      metadata,
    );
  }
}
