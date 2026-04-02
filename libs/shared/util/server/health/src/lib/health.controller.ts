import { Controller, Get, Optional } from '@nestjs/common';
import { HealthCheckService, HealthCheck, MikroOrmHealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    @Optional() private db?: MikroOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const checks = [];

    if (this.db) {
      checks.push(() => this.db!.pingCheck('database'));
    }

    return this.health.check(checks);
  }

  @Get('liveness')
  @HealthCheck()
  liveness() {
    return this.health.check([
       // Basic liveness check - just ensure the process is responding
       () => Promise.resolve({ up: { status: 'up' } } as HealthIndicatorResult)
    ]);
  }

  @Get('readiness')
  @HealthCheck()
  readiness() {
    const checks = [];

    if (this.db) {
      checks.push(() => this.db!.pingCheck('database'));
    }

    return this.health.check(checks);
  }
}
