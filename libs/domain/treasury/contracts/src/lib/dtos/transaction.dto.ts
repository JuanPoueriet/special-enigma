import { TransactionType } from '../enums/transaction-type.enum';

export class TransactionDto {
  id!: string;

  tenantId!: string;

  date!: Date;

  amount!: number;

  type!: TransactionType;

  description!: string;

  reference?: string;

  bankAccountId!: string;
}
