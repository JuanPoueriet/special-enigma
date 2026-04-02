import { Module } from '@nestjs/common';
import { BffCoreModule } from '@virtex/kernel-bff-core';
import { HealthModule } from '@virtex/shared-util-server-health';
import { TelemetryModule } from '@virtex/kernel-telemetry';
import { ServerConfigModule } from '@virtex/shared-util-server-server-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    BffCoreModule,
    HealthModule,
    TelemetryModule,
    ServerConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
