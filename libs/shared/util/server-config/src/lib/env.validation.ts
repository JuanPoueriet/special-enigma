import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  @IsOptional()
  PORT: number = 3000;

  @IsString()
  @MinLength(1)
  VIRTEEX_HMAC_SECRET: string;

  @IsString()
  @MinLength(1)
  REDIS_URL: string;

  // Database
  @IsString()
  @MinLength(1)
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  @MinLength(1)
  DB_USER: string;

  @IsString()
  @MinLength(1)
  DB_PASSWORD: string;

  @IsString()
  @MinLength(1)
  DB_NAME: string;

  @IsBoolean()
  @IsOptional()
  DB_SSL_ENABLED: boolean = false;

  // SMTP
  @IsString()
  @MinLength(1)
  SMTP_HOST: string;

  @IsNumber()
  SMTP_PORT: number;

  @IsString()
  @MinLength(1)
  SMTP_USER: string;

  @IsString()
  @MinLength(1)
  SMTP_PASSWORD: string;

  @IsString()
  @IsOptional()
  SMTP_FROM: string;

  @IsBoolean()
  @IsOptional()
  SMTP_SECURE: boolean = false;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
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
