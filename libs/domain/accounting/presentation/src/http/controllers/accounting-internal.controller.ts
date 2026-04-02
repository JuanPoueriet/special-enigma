import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccountingQueryFacade } from '@virtex/domain-accounting-application';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virtex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';

@ApiTags('Accounting (Internal)')
@Controller('internal/accounting')
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@RequireEntitlement('accounting:internal')
export class AccountingInternalController {
  constructor(private readonly queryFacade: AccountingQueryFacade) {}

  @Get('journal-entries/count')
  @ApiOperation({ summary: 'Count journal entries (internal)' })
  async countJournalEntries(@CurrentTenant() tenantId: string) {
    const count = await this.queryFacade.countJournalEntries(tenantId);
    return { count };
  }

  @Get('metrics/monthly-opex')
  @ApiOperation({ summary: 'Get monthly OPEX (internal)' })
  async getMonthlyOpex(@CurrentTenant() tenantId: string) {
    const amount = await this.queryFacade.getMonthlyOpex(tenantId);
    return { amount };
  }
}
