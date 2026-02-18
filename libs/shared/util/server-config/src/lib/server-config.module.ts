import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { GlobalConfigService } from './global-config.service';
import { IdempotencyService } from './services/idempotency.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  providers: [GlobalConfigService, IdempotencyService],
  exports: [ConfigModule, GlobalConfigService, IdempotencyService],
})
export class ServerConfigModule {}
