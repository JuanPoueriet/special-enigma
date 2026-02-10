import { Controller, Post, Body } from '@nestjs/common';
import { CalculatePayrollUseCase } from '@virteex/payroll-application';
import { CalculatePayrollDto } from '@virteex/payroll-contracts';
import { Payroll } from '@virteex/payroll-domain';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly calculatePayrollUseCase: CalculatePayrollUseCase) {}

  @Post('calculate')
  async calculate(@Body() dto: CalculatePayrollDto): Promise<Payroll> {
    return this.calculatePayrollUseCase.execute(dto);
  }
}
