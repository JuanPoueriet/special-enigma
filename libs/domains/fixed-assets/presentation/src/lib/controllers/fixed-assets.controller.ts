import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateFixedAssetUseCase, CreateFixedAssetDto } from '@virteex/fixed-assets-application';

@ApiTags('Fixed Assets')
@Controller('fixed-assets')
export class FixedAssetsController {
  constructor(
    private readonly createUseCase: CreateFixedAssetUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'FixedAssets' };
  }

  @Post()
  @ApiOperation({ summary: 'Create Fixed Asset' })
  create(@Body() dto: CreateFixedAssetDto) {
    return this.createUseCase.execute(dto);
  }
}
