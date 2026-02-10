import { plainToClass } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, MinLength, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsOptional()
  NODE_ENV: string = 'development';

  @IsNumber()
  @IsOptional()
  PORT: number = 3000;

  @IsString()
  @MinLength(1)
  @IsOptional()
  DB_HOST: string = 'localhost';

  @IsNumber()
  @IsOptional()
  DB_PORT: number = 5432;

  @IsString()
  @MinLength(1)
  @IsOptional()
  DB_USER: string = 'postgres';

  @IsString()
  @MinLength(1)
  @IsOptional()
  DB_PASSWORD: string = 'postgres';

  @IsString()
  @MinLength(1)
  @IsOptional()
  DB_NAME: string = 'virteex';

  @IsBoolean()
  @IsOptional()
  DB_SSL_ENABLED: boolean = false;

  @IsString()
  @MinLength(1)
  @IsOptional()
  SMTP_HOST: string = 'smtp.example.com';

  @IsNumber()
  @IsOptional()
  SMTP_PORT: number = 587;

  @IsString()
  @MinLength(1)
  @IsOptional()
  SMTP_USER: string = 'user';

  @IsString()
  @MinLength(1)
  @IsOptional()
  SMTP_PASSWORD: string = 'password';

  @IsString()
  @IsOptional()
  SMTP_FROM: string = 'noreply@virteex.com';

  @IsBoolean()
  @IsOptional()
  SMTP_SECURE: boolean = false;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
