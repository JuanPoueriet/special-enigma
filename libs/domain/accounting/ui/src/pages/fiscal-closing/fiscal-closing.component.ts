import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, AlertTriangle, Calendar, Lock, Loader2, XCircle, CheckCircle } from 'lucide-angular';
import { accountingFacade } from '../../facades/accounting.facade';

@Component({
  selector: 'app-fiscal-closing',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, LucideAngularModule],
  templateUrl: './fiscal-closing.component.html',
  styleUrl: './fiscal-closing.component.scss',
})
export class FiscalClosingComponent {
  accounting = accountingFacade();
  closingDate = new Date().toISOString().split('T')[0];
  loading = false;
  error = '';
  success = false;

  readonly icons = {
    AlertTriangle,
    Calendar,
    Lock,
    Loader2,
    XCircle,
    CheckCircle
  };

  async closePeriod() {
    if (!confirm('Are you sure you want to close this fiscal period? This action cannot be undone.')) {
        return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    try {
      await this.accounting.closeFiscalPeriod(this.closingDate);
      this.success = true;
      this.loading = false;
    } catch (err: any) {
      this.error = 'Failed to close fiscal period. ' + (err.error?.message || err.message || '');
      this.loading = false;
    }
  }
}
