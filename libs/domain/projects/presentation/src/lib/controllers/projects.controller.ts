import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProjectUseCase, CreateProjectDto } from '@virtex/domain-projects-application';
import { GetProjectsUseCase } from '@virtex/domain-projects-application';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virtex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virtex/kernel-entitlements';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly getProjectsUseCase: GetProjectsUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { status: 'ok', domain: 'Projects' };
  }

  @Post()
  @RequireEntitlement('projects:write')
  @ApiOperation({ summary: 'Create Project' })
  create(@Body() dto: CreateProjectDto, @CurrentTenant() tenantId: string) {
    dto.tenantId = tenantId;
    return this.createProjectUseCase.execute(dto);
  }

  @Get()
  @RequireEntitlement('projects:read')
  @ApiOperation({ summary: 'List Projects' })
  findAll(@CurrentTenant() tenantId: string) {
    return this.getProjectsUseCase.execute(tenantId);
  }
}
