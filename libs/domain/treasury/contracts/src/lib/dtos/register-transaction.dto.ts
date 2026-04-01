import { IsOptional, IsUUID } from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class RegisterTransactionDto {
  @IsUUID()
  @IsOptional()
  tenantId?: string;

  bankAccountId!: string;

  amount!: number;

  type!: TransactionType;

  description!: string;
}
