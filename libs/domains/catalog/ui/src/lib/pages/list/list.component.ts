import { Component, OnInit } from '@angular/core';


export interface ProductItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-catalog-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: ProductItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Product 1', status: 'Active' },
      { id: '2', name: 'Product 2', status: 'Pending' },
      { id: '3', name: 'Product 3', status: 'Closed' },
    ];
  }
}
