import { Component, OnInit } from '@angular/core';


export interface WarehouseItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-inventory-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: WarehouseItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Warehouse 1', status: 'Active' },
      { id: '2', name: 'Warehouse 2', status: 'Pending' },
      { id: '3', name: 'Warehouse 3', status: 'Closed' },
    ];
  }
}
