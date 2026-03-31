import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, Plus, Loader2, AlertCircle, FileText } from 'lucide-angular';
import { useAccounting } from '../../hooks/use-accounting';

@Component({
  selector: 'app-journal-entries',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LucideAngularModule],
  templateUrl: './journal-entries.component.html',
  styleUrl: './journal-entries.component.scss',
})
export class JournalEntriesComponent implements OnInit {
  accounting = useAccounting();

  readonly icons = {
    Plus,
    Loader2,
    AlertCircle,
    FileText
  };

  ngOnInit() {
    this.accounting.loadJournalEntries();
  }

  calculateFallbackAmount(entry: any): number {
    if (!entry.lines || !Array.isArray(entry.lines)) return 0;
    return entry.lines.reduce((sum: number, line: any) => {
      const debit = parseFloat(line.debit) || 0;
      return sum + debit;
    }, 0);
  }
}
