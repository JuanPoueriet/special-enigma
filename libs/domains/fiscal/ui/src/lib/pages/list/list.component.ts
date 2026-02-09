import { Component, OnInit } from '@angular/core';


export interface TaxruleItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-fiscal-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: TaxruleItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Taxrule 1', status: 'Active' },
      { id: '2', name: 'Taxrule 2', status: 'Pending' },
      { id: '3', name: 'Taxrule 3', status: 'Closed' },
    ];
  }
}
