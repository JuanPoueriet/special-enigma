import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, Plus, Loader2, AlertCircle, FileText } from 'lucide-angular';
import { accountingFacade } from '../../facades/accounting.facade';

@Component({
  selector: 'app-chart-of-accounts',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LucideAngularModule],
  templateUrl: './chart-of-accounts.component.html',
  styleUrl: './chart-of-accounts.component.scss',
})
export class ChartOfAccountsComponent implements OnInit {
  accounting = accountingFacade();

  readonly icons = {
    Plus,
    Loader2,
    AlertCircle,
    FileText
  };

  ngOnInit() {
    this.accounting.loadAccounts();
  }
}
