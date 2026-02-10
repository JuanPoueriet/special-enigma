import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateConfigUseCase, UpdateConfigDto } from '@virteex/admin-application';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly updateConfigUseCase: UpdateConfigUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'Admin' };
  }

  @Post('config')
  @ApiOperation({ summary: 'Update Tenant Config' })
  updateConfig(@Body() dto: UpdateConfigDto) {
    return this.updateConfigUseCase.execute(dto);
  }
}
