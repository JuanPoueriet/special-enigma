import { Injectable, Inject } from '@nestjs/common';
import { BiReport, BiReportRepository, BI_REPORT_REPOSITORY } from '@virteex/bi-domain';

export class GenerateReportDto {
  name!: string;
  type!: string;
  parameters?: any;
}

@Injectable()
export class GenerateReportUseCase {
  constructor(
    @Inject(BI_REPORT_REPOSITORY) private readonly repository: BiReportRepository
  ) {}

  async execute(dto: GenerateReportDto): Promise<BiReport> {
    // Mock logic: generate dummy data based on params
    const dummyData = { summary: 'Report Generated', value: Math.random() * 1000 };
    const report = new BiReport(dto.name, dto.type, dummyData);
    await this.repository.save(report);
    return report;
  }
}
