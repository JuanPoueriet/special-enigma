import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin/Monitoring')
@Controller('admin/monitoring')
export class MonitoringController {
  @Get('health')
  @ApiOperation({ summary: 'Get infrastructure and service health' })
  async getHealth() {
    return [
      { name: 'Gateway Service', status: 'UP', latency: 45, version: '2.4.1' },
      { name: 'Identity Service', status: 'UP', latency: 32, version: '1.9.0' },
      { name: 'Billing Service', status: 'UP', latency: 68, version: '3.1.2' },
      { name: 'Tenant Data Plane', status: 'UP', latency: 12, version: 'N/A' },
      { name: 'Audit Store (S3)', status: 'UP', latency: 154, version: 'AWS API' },
      { name: 'Message Broker (Kafka)', status: 'UP', latency: 8, version: '3.6.0' },
    ];
  }
}
