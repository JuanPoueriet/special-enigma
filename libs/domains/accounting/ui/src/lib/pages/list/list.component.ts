import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface JournalentryItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-accounting-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: JournalentryItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Journalentry 1', status: 'Active' },
      { id: '2', name: 'Journalentry 2', status: 'Pending' },
      { id: '3', name: 'Journalentry 3', status: 'Closed' },
    ];
  }
}
