import { Module, Global } from '@nestjs/common';
import { TelemetryService } from '@virteex/telemetry/lib/telemetry';

@Global()
@Module({
  providers: [TelemetryService],
  exports: [TelemetryService],
})
export class TelemetryModule {}
