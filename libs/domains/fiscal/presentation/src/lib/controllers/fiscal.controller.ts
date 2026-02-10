import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Fiscal')
@Controller('fiscal')
export class FiscalController {
  @Get()
  @ApiOperation({ summary: 'Health check for Fiscal domain' })
  healthCheck() {
    return { status: 'ok', domain: 'fiscal' };
  }
}
