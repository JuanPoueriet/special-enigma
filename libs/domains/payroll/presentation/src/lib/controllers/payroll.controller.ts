import { Controller, Post, Body } from '@nestjs/common';
import { CalculatePayrollUseCase } from '../../../../application/src/index';
import { CalculatePayrollDto } from '../../../../contracts/src/index';
import { Payroll } from '../../../../domain/src/index';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly calculatePayrollUseCase: CalculatePayrollUseCase) {}

  @Post('calculate')
  async calculate(@Body() dto: CalculatePayrollDto): Promise<Payroll> {
    return this.calculatePayrollUseCase.execute(dto);
  }
}
