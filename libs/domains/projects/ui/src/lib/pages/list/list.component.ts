import { Component, OnInit } from '@angular/core';


export interface ProjectItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-projects-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: ProjectItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Project 1', status: 'Active' },
      { id: '2', name: 'Project 2', status: 'Pending' },
      { id: '3', name: 'Project 3', status: 'Closed' },
    ];
  }
}
