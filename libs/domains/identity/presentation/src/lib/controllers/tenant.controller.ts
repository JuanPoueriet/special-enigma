import { Controller, Get, Inject } from '@nestjs/common';
import { ListTenantsUseCase } from '@virteex/identity-application';
import { Company } from '@virteex/identity-domain';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin/tenants')
export class TenantController {
  constructor(
    private readonly listTenantsUseCase: ListTenantsUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'List all tenants' })
  async findAll(): Promise<Company[]> {
    return this.listTenantsUseCase.execute();
  }
}
