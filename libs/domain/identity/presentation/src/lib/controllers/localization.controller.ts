import { Controller, Get, Param, Query, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '@virtex/kernel-auth';
import { LocalizationConfigDto, TaxLookupDto, FiscalRegionDto, TaxLookupQueryDto } from '@virtex/domain-identity-contracts';
import { LocalizationPort } from '@virtex/domain-identity-domain';

@ApiTags('Localization')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller('localization')
export class LocalizationController {
  constructor(
    @Inject(LocalizationPort) private readonly localizationService: LocalizationPort
  ) {}

  @Public()
  @Get('config/:code')
  @ApiOperation({ summary: 'Get regional configuration by country code' })
  @ApiResponse({ type: Object, description: 'LocalizationConfigDto' })
  async getConfig(@Param('code') code: string): Promise<LocalizationConfigDto> {
    return this.localizationService.getConfig(code);
  }

  @Public()
  @Get('lookup/:taxId')
  @ApiOperation({ summary: 'Lookup entity information by Tax ID' })
  @ApiResponse({ type: TaxLookupDto, description: 'TaxLookupDto' })
  async lookup(@Param('taxId') taxId: string, @Query() query: TaxLookupQueryDto): Promise<TaxLookupDto> {
    return this.localizationService.lookup(taxId, query.country);
  }

}
