import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Manufacturing')
@Controller('manufacturing')
export class ManufacturingController {
  @Get()
  @ApiOperation({ summary: 'Health check for Manufacturing domain' })
  healthCheck() {
    return { status: 'ok', domain: 'manufacturing' };
  }
}
