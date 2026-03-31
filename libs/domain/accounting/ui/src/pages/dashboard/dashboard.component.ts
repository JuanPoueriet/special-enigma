import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, Loader2, AlertTriangle, Settings, BookOpen, Clock, CalendarCheck, XCircle } from 'lucide-angular';
import { JournalEntryStatus, JournalEntryType } from '@virteex/domain-accounting-contracts';
import { accountingFacade } from '../../facades/accounting.facade';

@Component({
  selector: 'app-accounting-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  accounting = accountingFacade();

  readonly icons = {
    Loader2,
    AlertTriangle,
    Settings,
    BookOpen,
    Clock,
    CalendarCheck,
    XCircle
  };

  loading = computed(() => this.accounting.isAccountsLoading() || this.accounting.isEntriesLoading());
  error = computed(() => this.accounting.accountsError() || this.accounting.entriesError());

  stats = computed(() => {
    const accounts = this.accounting.accounts();
    const entries = this.accounting.entries();

    const pendingEntries = entries.filter(e => e.status === JournalEntryStatus.DRAFT).length;

    const closingEntries = entries
      .filter(e => e.type === JournalEntryType.CLOSING)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const latestClosing = closingEntries.length > 0 ? closingEntries[0] : null;
    const lastClosing = latestClosing ? new Date(latestClosing.date).toLocaleDateString() : 'No closing found';

    return {
      totalAccounts: accounts.length,
      pendingEntries,
      lastClosing
    };
  });

  ngOnInit() {
    this.accounting.loadAccounts();
    this.accounting.loadJournalEntries();
  }

  setupChart() {
    this.accounting.setupChartOfAccounts();
  }
}
