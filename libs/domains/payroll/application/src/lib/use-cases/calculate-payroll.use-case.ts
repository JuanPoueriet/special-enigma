import { Injectable, Inject, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PayrollStatus, PayrollType, PayrollDetailType } from '@virteex/contracts';
import {
  EmployeeRepository,
  EMPLOYEE_REPOSITORY,
  PayrollRepository,
  PAYROLL_REPOSITORY,
  Payroll,
  PayrollDetail,
  TaxService,
  TAX_SERVICE,
  PayrollPeriodCalculator
} from '../../../../domain/src/index';
import { CalculatePayrollDto } from '../../../../contracts/src/index';

@Injectable()
export class CalculatePayrollUseCase {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY) private employeeRepository: EmployeeRepository,
    @Inject(PAYROLL_REPOSITORY) private payrollRepository: PayrollRepository,
    @Inject(TAX_SERVICE) private taxService: TaxService,
    private payrollCalculator: PayrollPeriodCalculator
  ) {}

  async execute(dto: CalculatePayrollDto): Promise<Payroll> {
    const { tenantId, employeeId, periodStart, periodEnd } = dto;
    const start = new Date(periodStart);
    const end = new Date(periodEnd);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid period dates');
    }

    if (start > end) {
      throw new BadRequestException('Start date must be before end date');
    }

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
      throw new ConflictException(`Payroll for employee ${employeeId} in period ${start.toISOString()} - ${end.toISOString()} already exists`);
    }

    // Calculate days worked (inclusive) using Service
    // const timeDiff = end.getTime() - start.getTime();
    // const daysWorked = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    // Calculate base salary based on days worked (assuming 30 days month standard)
    // const dailySalary = employee.salary / 30;
    // const baseAmount = Number((dailySalary * daysWorked).toFixed(2));

    const incidencesDays = 0; // Placeholder for future incidence integration
    const baseAmount = this.payrollCalculator.calculateProportionalSalary(
      employee.salary,
      start,
      end,
      incidencesDays
    );

    // Create Payroll
    const payroll = new Payroll(tenantId, employee, start, end, new Date());
    payroll.type = PayrollType.REGULAR;
    payroll.status = PayrollStatus.DRAFT;

    // Add Salary Detail
    const salaryDetail = new PayrollDetail(tenantId, 'Sueldo Base', baseAmount, PayrollDetailType.EARNING);
    payroll.details.add(salaryDetail);

    // Add Tax Deduction (Using Real Tax Service)
    const taxAmount = await this.taxService.calculateTax(baseAmount);
    const taxDetail = new PayrollDetail(tenantId, 'ISR Retenido', taxAmount, PayrollDetailType.DEDUCTION);
    payroll.details.add(taxDetail);

    // Update totals
    payroll.totalEarnings = baseAmount;
    payroll.totalDeductions = taxAmount;
    payroll.netPay = Number((baseAmount - taxAmount).toFixed(2));

    await this.payrollRepository.save(payroll);

    return payroll;
  }
}
