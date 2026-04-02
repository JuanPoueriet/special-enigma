import { Controller, Get, Optional, Inject } from '@nestjs/common';
import { HealthCheckService, HealthCheck, MikroOrmHealthIndicator, HealthIndicatorResult, GRPCHealthIndicator, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { ClientGrpc, Transport } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    @Optional() private db?: MikroOrmHealthIndicator,
    @Optional() private grpc?: GRPCHealthIndicator,
    @Optional() private microservice?: MicroserviceHealthIndicator,
    @Optional() @Inject('IDENTITY_PACKAGE') private identityClient?: ClientGrpc,
    @Optional() @Inject('INVENTORY_PACKAGE') private inventoryClient?: ClientGrpc,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const checks = [];

    if (this.db) {
      checks.push(() => this.db!.pingCheck('database'));
    }

    if (this.grpc) {
      if (this.identityClient) {
        checks.push(() => this.grpc!.checkService('identity', 'identity.IdentityService', { timeout: 2000 }));
      }
      if (this.inventoryClient) {
        checks.push(() => this.grpc!.checkService('inventory', 'inventory.InventoryService', { timeout: 2000 }));
      }
    }

    if (this.microservice && process.env['KAFKA_BROKERS']) {
      checks.push(() => this.microservice!.pingCheck('kafka', {
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: process.env['KAFKA_BROKERS']!.split(','),
          }
        }
      }));
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
    return this.check();
  }
}
