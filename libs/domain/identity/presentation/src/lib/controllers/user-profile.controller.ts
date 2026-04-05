import { Controller, Get, Patch, Post, Body, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    GetUserProfileUseCase,
    UpdateUserProfileUseCase,
    UploadAvatarUseCase,
    GetAuditLogsUseCase
} from '@virtex/domain-identity-application';
import { UpdateUserDto, UserResponseDto, AuditLogDto } from '@virtex/domain-identity-contracts';
import { JwtAuthGuard, CurrentUser, StepUpGuard, TenantGuard } from '@virtex/kernel-auth';
import { UserMapper } from '../mappers/user.mapper';
import { AuditLogMapper } from '../mappers/audit-log.mapper';
import { EntitlementGuard } from '@virtex/kernel-entitlements';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Profile')
@Controller('users/profile')
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard, StepUpGuard)
export class UserProfileController {
  constructor(
    private readonly getProfile: GetUserProfileUseCase,
    private readonly updateProfile: UpdateUserProfileUseCase,
    private readonly uploadAvatar: UploadAvatarUseCase,
    private readonly getAuditLogs: GetAuditLogsUseCase
  ) {}

  @Get()
  async getMyProfile(@CurrentUser() user: any): Promise<UserResponseDto> {
    const userId = user?.sub;
    const userEntity = await this.getProfile.execute(userId);
    return UserMapper.toDto(userEntity);
  }

  @Get('audit-logs')
  async getMyAuditLogs(@CurrentUser() user: any): Promise<AuditLogDto[]> {
    const userId = user?.sub;
    const logs = await this.getAuditLogs.execute(userId);
    return AuditLogMapper.toDtoList(logs);
  }

  @Patch()
  async updateMyProfile(@CurrentUser() user: any, @Body() dto: UpdateUserDto): Promise<UserResponseDto> {
    const userId = user?.sub;
    const userEntity = await this.updateProfile.execute(userId, dto);
    return UserMapper.toDto(userEntity);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatarImage(@CurrentUser() user: any, @UploadedFile() file: any): Promise<{ url: string }> {
    if (!file) {
        throw new BadRequestException('No file uploaded');
    }
    const userId = user?.sub;
    const buffer = file.buffer;
    const originalName = file.originalname;
    const fileName = `${userId}/${Date.now()}-${originalName}`;
    const url = await this.uploadAvatar.execute(userId, fileName, buffer);
    return { url };
  }
}
