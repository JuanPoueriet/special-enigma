import { IsString, IsBoolean, IsOptional, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LocalizationConfigDto {
  @ApiProperty({ example: 'DO' })
  @IsString()
  @Length(2, 2)
  countryCode!: string;

  @ApiProperty({ example: 'República Dominicana' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'DOP' })
  @IsString()
  @Length(3, 3)
  currency!: string;

  @ApiProperty({ example: 'es-DO' })
  @IsString()
  locale!: string;

  @ApiProperty({ example: '^[0-9]{9,11}$' })
  @IsString()
  taxIdRegex!: string;

  @ApiProperty({ example: 'DO-MAIN' })
  @IsString()
  fiscalRegionId!: string;
}

export class TaxLookupDto {
  @ApiProperty()
  @IsString()
  taxId!: string;

  @ApiProperty()
  @IsString()
  country!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsBoolean()
  isValid!: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  industry?: string;
}

export class FiscalRegionDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsString()
  name!: string;
}

export class TaxLookupQueryDto {
  @ApiProperty({ description: 'The country code for the tax lookup' })
  @IsString()
  @Length(2, 2)
  country!: string;
}
