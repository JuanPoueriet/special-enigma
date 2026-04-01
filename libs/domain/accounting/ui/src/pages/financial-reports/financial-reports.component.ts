import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, FileText, Loader2, AlertCircle, Download, Search } from 'lucide-angular';
import { HasCapabilityDirective } from '../../directives/has-capability.directive';
import { accountingFacade } from '../../facades/accounting.facade';
import { FinancialReportLineDto } from '@virteex/domain-accounting-contracts';

@Component({
  selector: 'app-financial-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, LucideAngularModule, HasCapabilityDirective],
  templateUrl: './financial-reports.component.html',
  styleUrl: './financial-reports.component.scss',
})
export class FinancialReportsComponent {
  accounting = accountingFacade();
  reportType = 'BALANCE_SHEET';
  endDate = new Date().toISOString().split('T')[0];

  readonly icons = {
    FileText,
    Loader2,
    AlertCircle,
    Download,
    Search
  };

  generateReport() {
    this.accounting.generateReport(this.reportType, this.endDate);
  }

  calculateTotal(lines?: FinancialReportLineDto[]): number {
    if (!lines) return 0;
    return lines.reduce((acc, line) => acc + parseFloat(line.balance), 0);
  }
}
