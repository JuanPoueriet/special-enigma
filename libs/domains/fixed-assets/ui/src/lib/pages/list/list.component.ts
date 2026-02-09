import { Component, OnInit } from '@angular/core';


export interface AssetItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-fixed-assets-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: AssetItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Asset 1', status: 'Active' },
      { id: '2', name: 'Asset 2', status: 'Pending' },
      { id: '3', name: 'Asset 3', status: 'Closed' },
    ];
  }
}
