const ApiProperty =
  (_options?: unknown): PropertyDecorator =>
  () =>
    undefined;
const ApiPropertyOptional =
  (_options?: unknown): PropertyDecorator =>
  () =>
    undefined;

import { IsOptional, IsUUID } from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class RegisterTransactionDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  tenantId?: string;

  @ApiProperty()
  bankAccountId!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty({ enum: TransactionType })
  type!: TransactionType;

  @ApiProperty()
  description!: string;
}
