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
