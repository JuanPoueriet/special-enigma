import { Controller, HttpCode, HttpStatus, Head, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '@virteex/kernel-auth';
import { UserRepository, CompanyRepository } from '@virteex/domain-identity-domain';

@ApiTags('Common')
@Controller('common')
export class CommonController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  @Public()
  @Head('users/exists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check if a user exists by email' })
  @ApiResponse({ status: 200, description: 'User exists' })
  @ApiResponse({ status: 404, description: 'User does not exist' })
  async checkUserExists(@Query('email') email: string): Promise<void> {
    if (!email) {
      throw new NotFoundException('Email is required');
    }
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  @Public()
  @Head('organizations/exists')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check if an organization exists by Tax ID' })
  @ApiResponse({ status: 200, description: 'Organization exists' })
  @ApiResponse({ status: 404, description: 'Organization does not exist' })
  async checkOrganizationExists(@Query('taxId') taxId: string): Promise<void> {
    if (!taxId) {
      throw new NotFoundException('Tax ID is required');
    }
    const exists = await this.companyRepository.existsByTaxId(taxId);
    if (!exists) {
      throw new NotFoundException('Organization not found');
    }
  }
}
