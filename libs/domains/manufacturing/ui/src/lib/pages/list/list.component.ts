import { Component, OnInit } from '@angular/core';


export interface ProductionorderItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-manufacturing-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: ProductionorderItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Productionorder 1', status: 'Active' },
      { id: '2', name: 'Productionorder 2', status: 'Pending' },
      { id: '3', name: 'Productionorder 3', status: 'Closed' },
    ];
  }
}
