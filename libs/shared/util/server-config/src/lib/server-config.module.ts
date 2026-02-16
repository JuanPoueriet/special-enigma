import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { GlobalConfigService } from './global-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  providers: [GlobalConfigService],
  exports: [ConfigModule, GlobalConfigService],
})
export class ServerConfigModule {}
