import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Treasury')
@Controller('treasury')
export class TreasuryController {
  @Get()
  @ApiOperation({ summary: 'Health check for Treasury domain' })
  healthCheck() {
    return { status: 'ok', domain: 'treasury' };
  }
}
