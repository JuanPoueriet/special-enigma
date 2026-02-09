import { Component, OnInit } from '@angular/core';


export interface CustomerItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-crm-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: CustomerItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Customer 1', status: 'Active' },
      { id: '2', name: 'Customer 2', status: 'Pending' },
      { id: '3', name: 'Customer 3', status: 'Closed' },
    ];
  }
}
