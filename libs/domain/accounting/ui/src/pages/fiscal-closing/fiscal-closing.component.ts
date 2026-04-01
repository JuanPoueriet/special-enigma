import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, AlertTriangle, Calendar, Lock, Loader2, XCircle, CheckCircle, ClipboardList, ShieldCheck, FileText, ArrowLeftRight } from 'lucide-angular';
import { accountingFacade } from '../../facades/accounting.facade';

interface ClosingTask {
  id: string;
  title: string;
  status: 'PENDING' | 'COMPLETED' | 'ERROR';
  description: string;
  icon: any;
  requiredEvidence?: boolean;
  evidenceProvided?: boolean;
}

@Component({
  selector: 'app-fiscal-closing',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, LucideAngularModule],
  templateUrl: './fiscal-closing.component.html',
  styleUrl: './fiscal-closing.component.scss',
})
export class FiscalClosingComponent implements OnInit {
  accounting = accountingFacade();
  closingDate = new Date().toISOString().split('T')[0];
  loading = false;
  error = '';
  success = false;

  fiscalPeriods: any[] = [];
  selectedPeriodId: string = '';
  tasks: ClosingTask[] = [];

  ngOnInit() {
    this.loadFiscalPeriods();
  }

  async loadFiscalPeriods() {
    try {
        this.fiscalPeriods = await this.accounting.getFiscalPeriods();
        if (this.fiscalPeriods.length > 0) {
            this.selectedPeriodId = this.fiscalPeriods[0].id;
            this.loadTasks();
        }
    } catch (e) {
        this.error = 'Failed to load fiscal periods';
    }
  }

  async loadTasks() {
      if (!this.selectedPeriodId) return;
      try {
          const backendTasks = await this.accounting.getClosingTasks(this.selectedPeriodId);
          this.tasks = backendTasks.map((t: any) => ({
              ...t,
              icon: this.getIconForTask(t.title)
          }));
      } catch (e) {
          this.error = 'Failed to load closing tasks';
      }
  }

  private getIconForTask(title: string) {
      if (title.includes('REVIEW')) return ClipboardList;
      if (title.includes('RECONCILIATION')) return ArrowLeftRight;
      if (title.includes('REPORTS')) return FileText;
      return ShieldCheck;
  }

  readonly icons = {
    AlertTriangle,
    Calendar,
    Lock,
    Loader2,
    XCircle,
    CheckCircle,
    ClipboardList,
    ShieldCheck,
    FileText,
    ArrowLeftRight
  };

  async toggleTask(task: ClosingTask) {
      const newStatus = task.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
      let evidenceUrl = undefined;

      if (newStatus === 'COMPLETED' && task.requiredEvidence) {
          const url = prompt('Please provide evidence URL for this task:', 'https://storage.virteex.io/evidence/report-123.pdf');
          if (!url) return;
          evidenceUrl = url;
      }

      try {
          await this.accounting.updateClosingTaskStatus(task.id, newStatus, evidenceUrl);
          task.status = newStatus;
          if (task.requiredEvidence) {
              task.evidenceProvided = newStatus === 'COMPLETED';
              task.evidenceUrl = evidenceUrl;
          }
      } catch (e) {
          this.error = 'Failed to update task status';
      }
  }

  get canClose() {
      return this.tasks.every(t => t.status === 'COMPLETED') && !this.loading;
  }

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
