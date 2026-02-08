import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  EmployeeRepository,
  EMPLOYEE_REPOSITORY,
  PayrollRepository,
  PAYROLL_REPOSITORY,
  Payroll,
  Employee,
  PayrollDetail
} from '@virteex/payroll-domain';
import {
  CalculatePayrollDto,
  PayrollStatus,
  PayrollType,
  PayrollDetailType
} from '@virteex/payroll-contracts';

@Injectable()
export class CalculatePayrollUseCase {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY) private employeeRepository: EmployeeRepository,
    @Inject(PAYROLL_REPOSITORY) private payrollRepository: PayrollRepository
  ) {}

  async execute(dto: CalculatePayrollDto): Promise<Payroll> {
    const { tenantId, employeeId, periodStart, periodEnd } = dto;
    const start = new Date(periodStart);
    const end = new Date(periodEnd);

    const employee = await this.employeeRepository.findById(employeeId);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    if (employee.tenantId !== tenantId) {
       throw new NotFoundException(`Employee with ID ${employeeId} not found in tenant ${tenantId}`);
    }

    // Check if payroll already exists for this period
    const existing = await this.payrollRepository.findByEmployeeAndPeriod(employeeId, start, end);
    if (existing) {
      throw new Error(`Payroll for employee ${employeeId} in period ${start.toISOString()} - ${end.toISOString()} already exists`);
    }

    // Calculate base salary for the period (assuming semi-monthly for now)
    // In a real system, this would use Attendance records and specific rules.
    const baseAmount = employee.salary / 2;

    // Create Payroll
    const payroll = new Payroll(tenantId, employee, start, end, new Date()); // Payment date defaults to now
    payroll.type = PayrollType.REGULAR;
    payroll.status = PayrollStatus.DRAFT;

    // Add Salary Detail
    const salaryDetail = new PayrollDetail(tenantId, 'Sueldo Base', baseAmount, PayrollDetailType.EARNING);
    payroll.details.add(salaryDetail);

    // Add Tax Deduction (Simplified: 10%)
    const taxAmount = baseAmount * 0.10;
    const taxDetail = new PayrollDetail(tenantId, 'ISR Retenido', taxAmount, PayrollDetailType.DEDUCTION);
    payroll.details.add(taxDetail);

    // Update totals
    payroll.totalEarnings = baseAmount;
    payroll.totalDeductions = taxAmount;
    payroll.netPay = baseAmount - taxAmount;

    await this.payrollRepository.save(payroll);

    return payroll;
  }
}
