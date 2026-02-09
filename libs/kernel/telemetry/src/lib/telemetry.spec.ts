import { Test } from '@nestjs/testing';
import { TelemetryService } from '@virteex/telemetry/lib/telemetry';
import { TelemetryModule } from '@virteex/telemetry/lib/telemetry.module';

describe('TelemetryService', () => {
  let service: TelemetryService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TelemetryModule],
    }).compile();

    service = module.get(TelemetryService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should provide a tracer', () => {
    const tracer = service.getTracer();
    expect(tracer).toBeDefined();
  });
});
