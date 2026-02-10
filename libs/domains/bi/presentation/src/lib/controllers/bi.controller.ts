import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('BI')
@Controller('bi')
export class BiController {
  @Get()
  @ApiOperation({ summary: 'Health check for BI domain' })
  healthCheck() {
    return { status: 'ok', domain: 'bi' };
  }
}
