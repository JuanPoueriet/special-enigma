import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollService, Employee } from '../../core/services/payroll.service';

export interface EmployeeItem extends Employee {
  name: string;
}

@Component({
  selector: 'virteex-payroll-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private service = inject(PayrollService);
  items: EmployeeItem[] = [];

  ngOnInit() {
    this.service.getEmployees().subscribe((employees) => {
      this.items = employees.map(e => ({
        ...e,
        name: `${e.firstName} ${e.lastName}`
      }));
    });
  }
}
