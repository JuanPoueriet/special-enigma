import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('CRM')
@Controller('crm')
export class CrmController {
  @Get()
  @ApiOperation({ summary: 'Health check for CRM domain' })
  healthCheck() {
    return { status: 'ok', domain: 'crm' };
  }
}
