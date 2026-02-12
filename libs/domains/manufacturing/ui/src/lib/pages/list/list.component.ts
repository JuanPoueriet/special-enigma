import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufacturingService, ProductionOrder } from '../../core/services/manufacturing.service';

export interface ProductionorderItem extends ProductionOrder {
  name: string;
}

@Component({
  selector: 'virteex-manufacturing-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  private service = inject(ManufacturingService);
  items: ProductionorderItem[] = [];

  ngOnInit() {
    this.service.getOrders().subscribe((orders) => {
      this.items = orders.map((o) => ({
        ...o,
        name: o.productSku // Map SKU to name for display
      }));
    });
  }
}
