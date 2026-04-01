const ApiProperty =
  (_options?: unknown): PropertyDecorator =>
  () =>
    undefined;
const ApiPropertyOptional =
  (_options?: unknown): PropertyDecorator =>
  () =>
    undefined;

export class BankAccountDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  accountNumber!: string;

  @ApiProperty()
  bankName!: string;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  balance!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
