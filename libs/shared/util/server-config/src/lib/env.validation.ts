import { plainToClass } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, MinLength, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsString()
  @IsOptional()
  NODE_ENV = 'development';

  @IsNumber()
  @IsOptional()
  PORT = 3000;

  @IsString()
  @MinLength(1)
  @IsOptional()
  DB_HOST = 'localhost';

  @IsNumber()
  @IsOptional()
  DB_PORT = 5432;

  @IsString()
  @MinLength(1)
  @IsOptional()
  DB_USER = 'postgres';

  @IsString()
  @MinLength(1)
  @IsOptional()
  DB_PASSWORD = 'postgres';

  @IsString()
  @MinLength(1)
  @IsOptional()
  DB_NAME = 'virteex';

  @IsBoolean()
  @IsOptional()
  DB_SSL_ENABLED = false;

  @IsString()
  @MinLength(1)
  @IsOptional()
  SMTP_HOST = 'smtp.example.com';

  @IsNumber()
  @IsOptional()
  SMTP_PORT = 587;

  @IsString()
  @MinLength(1)
  @IsOptional()
  SMTP_USER = 'user';

  @IsString()
  @MinLength(1)
  @IsOptional()
  SMTP_PASSWORD = 'password';

  @IsString()
  @IsOptional()
  SMTP_FROM = 'noreply@virteex.com';

  @IsBoolean()
  @IsOptional()
  SMTP_SECURE = false;
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
