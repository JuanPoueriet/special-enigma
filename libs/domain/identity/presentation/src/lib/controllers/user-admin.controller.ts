import { Controller, Get, Patch, Post, Delete, Put, Body, Param, Query, UseGuards, NotFoundException } from '@nestjs/common';
import {
    InviteUserUseCase,
    GetJobTitlesUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    BlockUserUseCase
} from '@virtex/domain-identity-application';
import { UserRepository } from '@virtex/domain-identity-domain';
import { UpdateUserDto, InviteUserDto, PaginatedUsersResponse, UserResponseDto } from '@virtex/domain-identity-contracts';
import { JwtAuthGuard, CurrentUser, StepUp, StepUpGuard, TenantGuard } from '@virtex/kernel-auth';
import { UserMapper } from '../mappers/user.mapper';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Administration')
@Controller('users')
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard, StepUpGuard)
export class UserAdminController {
  constructor(
    private readonly inviteUser: InviteUserUseCase,
    private readonly getJobTitlesUseCase: GetJobTitlesUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly blockUserUseCase: BlockUserUseCase,
    private readonly userRepository: UserRepository
  ) {}

  @Get()
  @RequireEntitlement('users')
  @StepUp({ action: 'tenant-admin', maxAgeSeconds: 300 })
  async listUsers(
    @CurrentUser() user: any,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Query('searchTerm') searchTerm?: string,
    @Query('statusFilter') statusFilter?: string,
    @Query('sortColumn') sortColumn?: string,
    @Query('sortDirection') sortDirection?: 'ASC' | 'DESC'
  ): Promise<PaginatedUsersResponse> {
    const tenantId = user?.tenantId;
    const result = await this.listUsersUseCase.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      searchTerm,
      statusFilter,
      sortColumn,
      sortDirection,
      tenantId
    });

    return {
      data: result.data.map(u => UserMapper.toDto(u)),
      total: result.total
    };
  }

  @Get('job-titles')
  async getJobTitles(): Promise<string[]> {
    const titles = await this.getJobTitlesUseCase.execute();
    return titles.map(t => t.title);
  }

  @Patch(':id')
  @RequireEntitlement('users')
  @StepUp({ action: 'tenant-admin', maxAgeSeconds: 300 })
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto, @CurrentUser() user: any): Promise<UserResponseDto> {
    const userEntity = await this.updateUserUseCase.execute(id, dto, user.tenantId);
    return UserMapper.toDto(userEntity);
  }

  @Delete(':id')
  @RequireEntitlement('users')
  @StepUp({ action: 'tenant-admin', maxAgeSeconds: 300 })
  async delete(@Param('id') id: string, @CurrentUser() user: any): Promise<void> {
    await this.deleteUserUseCase.execute(id, user.tenantId);
  }

  @Post('invite')
  @RequireEntitlement('users')
  @StepUp({ action: 'tenant-admin', maxAgeSeconds: 300 })
  async invite(@CurrentUser() user: any, @Body() dto: InviteUserDto): Promise<UserResponseDto> {
    const currentUserId = user?.sub;
    const userEntity = await this.inviteUser.execute(dto, currentUserId);
    return UserMapper.toDto(userEntity);
  }

  @Post(':id/block-and-logout')
  @RequireEntitlement('users')
  @StepUp({ action: 'tenant-admin', maxAgeSeconds: 300 })
  async blockAndLogout(@Param('id') id: string, @CurrentUser() user: any): Promise<void> {
    const targetUser = await this.userRepository.findById(id, user.tenantId);
    if (!targetUser) {
        throw new NotFoundException('User not found or does not belong to your organization');
    }
    await this.blockUserUseCase.execute(id);
  }

  @Put(':id/status')
  @RequireEntitlement('users')
  @StepUp({ action: 'tenant-admin', maxAgeSeconds: 300 })
  async setUserStatus(@Param('id') id: string, @Body() body: { isOnline: boolean }, @CurrentUser() user: any): Promise<UserResponseDto> {
    const userEntity = await this.updateUserUseCase.execute(id, { status: body.isOnline ? 'ONLINE' : 'OFFLINE' } as any, user.tenantId);
    return UserMapper.toDto(userEntity);
  }
}
