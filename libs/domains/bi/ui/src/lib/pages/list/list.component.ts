import { Component, OnInit } from '@angular/core';


export interface ReportItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-bi-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: ReportItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Report 1', status: 'Active' },
      { id: '2', name: 'Report 2', status: 'Pending' },
      { id: '3', name: 'Report 3', status: 'Closed' },
    ];
  }
}
