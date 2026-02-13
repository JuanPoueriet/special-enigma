import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManufacturingService, ProductionOrder } from '../../core/services/manufacturing.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'virteex-manufacturing-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private service = inject(ManufacturingService);
  totalOrders$: Observable<number>;

  constructor() {
    this.totalOrders$ = this.service.getOrders().pipe(
      map(orders => orders.length)
    );
  }

  ngOnInit() {}
}
