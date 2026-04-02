import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CalculatePayrollDto } from '@virtex/domain-payroll-contracts';
import { CalculatePayrollUseCase, GetEmployeesUseCase } from '@virtex/domain-payroll-application';
import { type Payroll, Employee } from '@virtex/domain-payroll-domain';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virtex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';

@ApiTags('Payroll')
@ApiBearerAuth()
@Controller('payroll')
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
export class PayrollController {
  constructor(
    private readonly calculatePayrollUseCase: CalculatePayrollUseCase,
    private readonly getEmployeesUseCase: GetEmployeesUseCase
  ) {}

  @Post('calculate')
  @RequireEntitlement('payroll:write')
  @ApiOperation({ summary: 'Calculate payroll for an employee' })
  @ApiResponse({ status: 201 })
  async calculatePayroll(@Body() dto: CalculatePayrollDto, @CurrentTenant() tenantId: string): Promise<Payroll> {
    return this.calculatePayrollUseCase.execute({ ...dto, tenantId });
  }

  @Get('employees')
  @RequireEntitlement('payroll:read')
  @ApiOperation({ summary: 'Get all employees' })
  async getEmployees(@CurrentTenant() tenantId: string): Promise<Employee[]> {
    return this.getEmployeesUseCase.execute(tenantId);
  }
}
