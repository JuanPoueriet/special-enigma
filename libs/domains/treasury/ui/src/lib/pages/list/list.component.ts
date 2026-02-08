import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BankaccountItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-treasury-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: BankaccountItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Bankaccount 1', status: 'Active' },
      { id: '2', name: 'Bankaccount 2', status: 'Pending' },
      { id: '3', name: 'Bankaccount 3', status: 'Closed' },
    ];
  }
}
