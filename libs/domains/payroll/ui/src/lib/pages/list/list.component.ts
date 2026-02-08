import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface EmployeeItem {
  id: string;
  name: string;
  status: string;
}

@Component({
  selector: 'virteex-payroll-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  items: EmployeeItem[] = [];

  ngOnInit() {
    this.items = [
      { id: '1', name: 'Employee 1', status: 'Active' },
      { id: '2', name: 'Employee 2', status: 'Pending' },
      { id: '3', name: 'Employee 3', status: 'Closed' },
    ];
  }
}
