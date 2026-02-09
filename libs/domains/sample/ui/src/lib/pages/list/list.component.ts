import { Component, OnInit } from '@angular/core';


export interface SampleitemItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-sample-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: SampleitemItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Sampleitem 1', status: 'Active' },
      { id: '2', name: 'Sampleitem 2', status: 'Pending' },
      { id: '3', name: 'Sampleitem 3', status: 'Closed' },
    ];
  }
}
