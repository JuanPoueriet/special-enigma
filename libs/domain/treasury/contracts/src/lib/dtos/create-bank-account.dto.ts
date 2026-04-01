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
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  tenantId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accountNumber!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bankName!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currency!: string;
}
