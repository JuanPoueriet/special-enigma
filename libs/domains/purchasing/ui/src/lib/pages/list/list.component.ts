import { Component, OnInit } from '@angular/core';


export interface SupplierItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-purchasing-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: SupplierItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Supplier 1', status: 'Active' },
      { id: '2', name: 'Supplier 2', status: 'Pending' },
      { id: '3', name: 'Supplier 3', status: 'Closed' },
    ];
  }
}
