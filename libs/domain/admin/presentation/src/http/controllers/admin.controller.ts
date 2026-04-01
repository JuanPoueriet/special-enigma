import { Controller, Post, UseInterceptors, UploadedFile, Body, Logger, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { DataImportService } from '@virteex/domain-admin-application';
import { Express } from 'express';
import 'multer';
import { JwtAuthGuard, TenantGuard, CurrentTenant } from '@virteex/kernel-auth';
import { RequireEntitlement, EntitlementGuard } from '@virteex/kernel-entitlements';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, TenantGuard, EntitlementGuard)
@Controller('admin')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(
    private readonly dataImportService: DataImportService
  ) {}

  @Post('import')
  @RequireEntitlement('admin:import')
  @ApiOperation({ summary: 'Import Data from CSV/Excel' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        dataType: {
          type: 'string',
          enum: ['customers', 'products', 'suppliers'],
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async importData(@UploadedFile() file: Express.Multer.File, @Body('dataType') dataType: string, @CurrentTenant() tenantId: string) {
    this.logger.log(`Received file import request for ${dataType} in tenant ${tenantId}`);
    if (!file) {
        throw new Error('File is required');
    }

    const result = await this.dataImportService.processFile(file.buffer, dataType, tenantId);
    return {
        message: 'File processed successfully',
        ...result
    };
  }
}
