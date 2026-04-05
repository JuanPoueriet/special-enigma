import { Controller, Post, Param, Body, Req, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import {
    ForceLogoutUseCase,
    ForgotPasswordUseCase
} from '@virtex/domain-identity-application';
import { UserRepository } from '@virtex/domain-identity-domain';
import { JwtAuthGuard, CurrentUser, StepUpGuard, TenantGuard, StepUp } from '@virtex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Security')
@Controller('users')
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard, StepUpGuard)
export class UserSecurityController {
  constructor(
    private readonly forceLogoutUseCase: ForceLogoutUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly userRepository: UserRepository
  ) {}

  @Post(':id/force-logout')
  @RequireEntitlement('users')
  @StepUp({ action: 'tenant-admin', maxAgeSeconds: 300 })
  async forceLogout(@Param('id') id: string, @CurrentUser() user: any): Promise<void> {
    const targetUser = await this.userRepository.findById(id, user.tenantId);
    if (!targetUser) {
        throw new NotFoundException('User not found or does not belong to your organization');
    }
    await this.forceLogoutUseCase.execute(id);
  }

  @Post(':id/reset-password')
  @RequireEntitlement('users')
  @StepUp({ action: 'tenant-admin', maxAgeSeconds: 300 })
  async sendPasswordReset(@Param('id') id: string, @Req() req: any, @CurrentUser() currentUser: any): Promise<{ message: string }> {
    const user = await this.userRepository.findById(id, currentUser.tenantId);
    if (!user) {
        throw new NotFoundException('User not found in tenant context');
    }
    await this.forgotPasswordUseCase.execute({ email: user.email, recaptchaToken: '' }, {
        ip: req.ip,
        userAgent: req.headers['user-agent']
    }, true);
    return { message: 'Password reset email sent' };
  }
}
