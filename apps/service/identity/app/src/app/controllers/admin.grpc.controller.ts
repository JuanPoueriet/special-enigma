import { Controller, Inject, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CompanyRepository,
} from '@virtex/domain-identity-domain';
import {
  ListTenantsUseCase,
} from '@virtex/domain-identity-application';
import { AppService } from '../app.service';
import { Roles, RolesGuard, JwtAuthGuard } from '@virtex/kernel-auth';
import { GrpcAuthGuard } from '../guards/grpc-auth.guard';

@Controller()
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AdminGrpcController {
  constructor(
    private readonly appService: AppService,
    @Inject(CompanyRepository) private readonly companyRepository: CompanyRepository,
    private readonly listTenantsUseCase: ListTenantsUseCase,
  ) {}

  @UseGuards(GrpcAuthGuard, RolesGuard)
  @Roles('admin')
  @GrpcMethod('IdentityService', 'ListTenants')
  async listTenants() {
    const tenants = await this.listTenantsUseCase.execute();
    return {
      tenants: tenants.map((t) => ({
        id: t.id,
        name: t.name,
        tax_id: t.taxId,
        country: t.country,
      })),
    };
  }

  @GrpcMethod('IdentityService', 'HealthCheck')
  async healthCheck() {
    return { status: 'ok' };
  }

  @GrpcMethod('IdentityService', 'GetData')
  async getData() {
    return this.appService.getData();
  }

  @GrpcMethod('IdentityService', 'CheckOrganizationExists')
  async checkOrganizationExists(data: any) {
    const exists = await this.companyRepository.existsByTaxId(data.tax_id);
    return { exists };
  }
}
