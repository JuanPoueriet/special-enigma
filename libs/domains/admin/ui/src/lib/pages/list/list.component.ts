import { Component, OnInit } from '@angular/core';


export interface UserItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-admin-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: UserItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'User 1', status: 'Active' },
      { id: '2', name: 'User 2', status: 'Pending' },
      { id: '3', name: 'User 3', status: 'Closed' },
    ];
  }
}
