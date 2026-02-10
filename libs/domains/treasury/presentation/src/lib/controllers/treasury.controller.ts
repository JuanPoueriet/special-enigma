import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBankAccountDto, BankAccountDto } from '../../../../contracts/src/index';
import { CreateBankAccountUseCase, GetBankAccountsUseCase } from '../../../../application/src/index';

@ApiTags('Treasury')
@Controller('treasury')
export class TreasuryController {
  constructor(
    private readonly createBankAccountUseCase: CreateBankAccountUseCase,
    private readonly getBankAccountsUseCase: GetBankAccountsUseCase
  ) {}

  @Post('bank-accounts')
  @ApiOperation({ summary: 'Create a new bank account' })
  @ApiResponse({ status: 201, type: BankAccountDto })
  async createBankAccount(@Body() dto: CreateBankAccountDto): Promise<BankAccountDto> {
    return this.createBankAccountUseCase.execute(dto);
  }

  @Get('bank-accounts')
  @ApiOperation({ summary: 'Get all bank accounts' })
  @ApiResponse({ status: 200, type: [BankAccountDto] })
  async getBankAccounts(@Query('tenantId') tenantId: string): Promise<BankAccountDto[]> {
    return this.getBankAccountsUseCase.execute(tenantId);
  }
}
