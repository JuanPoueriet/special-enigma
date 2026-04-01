import { IsString, IsBoolean, IsOptional, Length } from 'class-validator';

export class LocalizationConfigDto {
  @IsString()
  @Length(2, 2)
  countryCode!: string;

  @IsString()
  name!: string;

  @IsString()
  @Length(3, 3)
  currency!: string;

  @IsString()
  locale!: string;

  @IsString()
  taxIdRegex!: string;

  @IsString()
  fiscalRegionId!: string;

  @IsString()
  @IsOptional()
  taxIdLabel?: string;

  @IsString()
  @IsOptional()
  taxIdMask?: string;

  @IsString()
  @IsOptional()
  phoneCode?: string;

  @IsOptional()
  formSchema?: any;
}

export class TaxLookupDto {
  @IsString()
  taxId!: string;

  @IsString()
  country!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  legalName?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  isValid!: boolean;

  @IsString()
  @IsOptional()
  industry?: string;
}

export class FiscalRegionDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;
}

export class TaxLookupQueryDto {
  @IsString()
  @Length(2, 2)
  country!: string;
}
