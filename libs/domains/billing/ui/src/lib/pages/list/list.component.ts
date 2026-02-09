import { Component, OnInit } from '@angular/core';


export interface InvoiceItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-billing-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: InvoiceItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Invoice 1', status: 'Active' },
      { id: '2', name: 'Invoice 2', status: 'Pending' },
      { id: '3', name: 'Invoice 3', status: 'Closed' },
    ];
  }
}
