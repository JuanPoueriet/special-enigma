const ApiProperty =
  (_options?: unknown): PropertyDecorator =>
  () =>
    undefined;
const ApiPropertyOptional =
  (_options?: unknown): PropertyDecorator =>
  () =>
    undefined;

import { TransactionType } from '../enums/transaction-type.enum';

export class TransactionDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  date!: Date;

  @ApiProperty()
  amount!: number;

  @ApiProperty({ enum: TransactionType })
  type!: TransactionType;

  @ApiProperty()
  description!: string;

  @ApiProperty({ required: false })
  reference?: string;

  @ApiProperty()
  bankAccountId!: string;
}
