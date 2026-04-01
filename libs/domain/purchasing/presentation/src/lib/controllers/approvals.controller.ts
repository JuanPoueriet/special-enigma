import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virteex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virteex/kernel-entitlements';
import { GetRequisitionsUseCase, ApproveRequisitionUseCase, RejectRequisitionUseCase } from '@virteex/domain-purchasing-application';

@ApiTags('Purchasing Approvals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('approvals')
export class ApprovalsController {
  constructor(
    private readonly getRequisitionsUseCase: GetRequisitionsUseCase,
    private readonly approveRequisitionUseCase: ApproveRequisitionUseCase,
    private readonly rejectRequisitionUseCase: RejectRequisitionUseCase
  ) {}

  @Get('pending')
  @RequireEntitlement('purchasing:requisitions:read')
  async getPending(@CurrentTenant() tenantId: string) {
    const requisitions = await this.getRequisitionsUseCase.execute(tenantId);

    return requisitions
      .filter(req => req.status === 'Pending Approval')
      .map(req => ({
        id: req.id,
        title: `Requisition #${req.reqNumber}`,
        requester: req.requester || 'Unknown',
        amount: req.total
      }));
  }

  @Post(':id/approve')
  @RequireEntitlement('purchasing:requisitions:write')
  async approve(@Param('id') id: string, @CurrentTenant() tenantId: string) {
    await this.approveRequisitionUseCase.execute(id, tenantId);
    return { success: true };
  }

  @Post(':id/reject')
  @RequireEntitlement('purchasing:requisitions:write')
  async reject(@Param('id') id: string, @CurrentTenant() tenantId: string) {
    await this.rejectRequisitionUseCase.execute(id, tenantId);
    return { success: true };
  }
}
