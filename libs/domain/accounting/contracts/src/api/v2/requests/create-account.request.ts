import { IsString, IsNotEmpty, IsEnum, IsOptional, IsUUID, IsObject } from 'class-validator';
import { AccountType } from '../../../shared/enums/account-type.enum';

export class CreateAccountRequestV2 {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(AccountType)
  type!: AccountType;

  @IsOptional()
  @IsUUID()
  parentId?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
