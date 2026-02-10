import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  @Get()
  @ApiOperation({ summary: 'Health check for Projects domain' })
  healthCheck() {
    return { status: 'ok', domain: 'projects' };
  }
}
