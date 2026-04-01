import { IsEnum, IsDateString, IsOptional, IsString, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export enum InvoiceStatusDto {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export class InvoiceLineItemDto {
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  quantity!: number;

  @IsString()
  @IsNotEmpty()
  unitPrice!: string;

  @IsString()
  @IsNotEmpty()
  total!: string;

  @IsOptional()
  @IsString()
  taxAmount?: string;
}

export class RecordInvoiceDto {
  @IsString()
  @IsNotEmpty()
  number!: string;

  @IsDateString()
  issueDate!: string;

  @IsDateString()
  dueDate!: string;

  @IsString()
  @IsNotEmpty()
  currency!: string;

  @IsString()
  @IsNotEmpty()
  amount!: string;

  @IsOptional()
  @IsString()
  taxAmount?: string;

  @IsEnum(['PAYABLE', 'RECEIVABLE'])
  type!: 'PAYABLE' | 'RECEIVABLE';

  @IsOptional()
  @IsString()
  vendorId?: string;

  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsArray()
  lineItems?: InvoiceLineItemDto[];

  @IsString()
  @IsNotEmpty()
  expenseAccountCode!: string;

  @IsString()
  @IsNotEmpty()
  payableAccountCode!: string;
}
