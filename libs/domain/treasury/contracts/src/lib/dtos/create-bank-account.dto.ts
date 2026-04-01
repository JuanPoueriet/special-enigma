const ApiProperty =
  (_options?: unknown): PropertyDecorator =>
  () =>
    undefined;
const ApiPropertyOptional =
  (_options?: unknown): PropertyDecorator =>
  () =>
    undefined;

import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateBankAccountDto {
  @IsUUID()
  @IsOptional()
  tenantId?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  accountNumber!: string;

  @IsString()
  @IsNotEmpty()
  bankName!: string;

  @IsString()
  @IsNotEmpty()
  currency!: string;
}
