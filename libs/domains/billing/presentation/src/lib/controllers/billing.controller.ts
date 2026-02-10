import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateInvoiceUseCase, CreateInvoiceDto } from '@virteex/billing-application';
import { GetInvoicesUseCase } from '@virteex/billing-application';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Billing')
@Controller('billing')
export class BillingController {
  constructor(
    private readonly createInvoiceUseCase: CreateInvoiceUseCase,
    private readonly getInvoicesUseCase: GetInvoicesUseCase
  ) {}

  @Post('invoices')
  create(@Body() dto: CreateInvoiceDto) {
    return this.createInvoiceUseCase.execute(dto);
  }

  @Get('invoices')
  findAll() {
    return this.getInvoicesUseCase.execute();
  }
}
