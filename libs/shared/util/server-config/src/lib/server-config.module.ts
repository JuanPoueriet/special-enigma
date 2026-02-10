import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from '@virteex/shared-util-server-config/src/lib/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true, // Make it available everywhere without importing
      cache: true,
    }),
  ],
  exports: [ConfigModule],
})
export class ServerConfigModule {}
