import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CalculatePayrollDto } from '../../../../contracts/src/index';
import { CalculatePayrollUseCase } from '../../../../application/src/index';
import { Payroll } from '../../../../domain/src/index';

@ApiTags('Payroll')
@Controller('payroll')
export class PayrollController {
  constructor(private readonly calculatePayrollUseCase: CalculatePayrollUseCase) {}

  @Post('calculate')
  @ApiOperation({ summary: 'Calculate payroll for an employee' })
  @ApiResponse({ status: 201 }) // Todo: Return Payroll DTO
  async calculatePayroll(@Body() dto: CalculatePayrollDto): Promise<Payroll> {
    return this.calculatePayrollUseCase.execute(dto);
  }
}
