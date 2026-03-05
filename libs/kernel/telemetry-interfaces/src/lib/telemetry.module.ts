import { Module, Global } from '@nestjs/common';
import { TELEMETRY_SERVICE } from './telemetry.service.interface';

@Global()
@Module({
  providers: [
    {
      provide: TELEMETRY_SERVICE,
      useValue: {
        recordSecurityEvent: () => {},
        recordBusinessMetric: () => {},
        recordInvoiceEmitted: () => {},
        recordPaymentProcessed: () => {},
        setTraceAttributes: () => {}
      }
    }
  ],
  exports: [TELEMETRY_SERVICE]
})
export class TelemetryModule {}
