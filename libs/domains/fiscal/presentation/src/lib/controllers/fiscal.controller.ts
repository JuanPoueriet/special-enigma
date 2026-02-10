import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateDeclarationUseCase, CreateDeclarationDto } from '@virteex/fiscal-application';

@ApiTags('Fiscal')
@Controller('fiscal')
export class FiscalController {
  constructor(
    private readonly createUseCase: CreateDeclarationUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'Fiscal' };
  }

  @Post('declarations')
  @ApiOperation({ summary: 'Create Tax Declaration' })
  create(@Body() dto: CreateDeclarationDto) {
    return this.createUseCase.execute(dto);
  }
}
