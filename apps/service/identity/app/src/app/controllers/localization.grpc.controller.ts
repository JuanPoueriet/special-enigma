import { Controller, Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  LocalizationPort,
  GEO_IP_PORT,
  GeoIpPort
} from '@virtex/domain-identity-domain';

@Controller()
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class LocalizationGrpcController {
  constructor(
    @Inject(LocalizationPort) private readonly localizationService: LocalizationPort,
    @Inject(GEO_IP_PORT) private readonly geoIpService: GeoIpPort,
  ) {}

  @GrpcMethod('IdentityService', 'GetLocalizationConfig')
  async getLocalizationConfig(data: any) {
    const result = await this.localizationService.getConfig(data.code);
    return {
      country_code: result.countryCode,
      name: result.name,
      currency: result.currency,
      locale: result.locale,
      tax_id_regex: result.taxIdRegex,
      fiscal_region_id: result.fiscalRegionId,
      tax_id_label: result.taxIdLabel,
      tax_id_mask: result.taxIdMask,
      phone_code: result.phoneCode,
      form_schema_json: JSON.stringify(result.formSchema),
    };
  }

  @GrpcMethod('IdentityService', 'LocalizationLookup')
  async localizationLookup(data: any) {
    const result = await this.localizationService.lookup(data.tax_id, data.country);
    return {
      tax_id: result.taxId,
      country: result.country,
      name: result.name,
      legal_name: result.legalName,
      status: result.status,
      is_valid: result.isValid,
      industry: result.industry,
    };
  }

  @GrpcMethod('IdentityService', 'GetLocation')
  async getLocation(data: any) {
    const result = await this.geoIpService.lookup(data.ip);
    return {
      country: result?.country,
      region: result?.region,
      city: result?.city,
      timezone: result?.timezone,
    };
  }
}
