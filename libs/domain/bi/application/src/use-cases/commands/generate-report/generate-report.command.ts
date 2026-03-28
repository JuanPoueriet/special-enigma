import { GenerateReportDto } from '../../../dto/generate-report.dto';

export class GenerateReportCommand {
  constructor(public readonly dto: GenerateReportDto) {}
}
