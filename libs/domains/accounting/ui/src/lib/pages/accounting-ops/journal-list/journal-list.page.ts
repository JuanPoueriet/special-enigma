import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountingService } from '../../../services/accounting.service';

@Component({
  selector: 'virteex-journal-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './journal-list.page.html',
  styleUrls: ['./journal-list.page.scss'],
})
export class JournalListPage implements OnInit {
  private accountingService = inject(AccountingService);

  journals = signal<any[]>([]);

  ngOnInit() {
    this.accountingService.getJournalEntries().subscribe((journals) => {
      this.journals.set(journals);
    });
  }
}
