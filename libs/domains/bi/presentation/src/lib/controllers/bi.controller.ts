import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GenerateReportUseCase, GenerateReportDto } from '@virteex/bi-application';

@ApiTags('BI')
@Controller('bi')
export class BiController {
  constructor(
    private readonly generateUseCase: GenerateReportUseCase
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
      return { status: 'ok', domain: 'BI' };
  }

  @Post('reports')
  @ApiOperation({ summary: 'Generate Report' })
  generate(@Body() dto: GenerateReportDto) {
    return this.generateUseCase.execute(dto);
  }
}
