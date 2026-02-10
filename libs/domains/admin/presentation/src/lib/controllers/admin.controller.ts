import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  @Get()
  @ApiOperation({ summary: 'Health check for Admin domain' })
  healthCheck() {
    return { status: 'ok', domain: 'admin' };
  }
}
