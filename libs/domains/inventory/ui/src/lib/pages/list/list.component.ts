import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'virteex-inventory-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class InventoryListComponent implements OnInit {
  private inventoryService = inject(InventoryService);
  warehouses = signal<any[]>([]);

  ngOnInit() {
    this.inventoryService.getWarehouses().subscribe({
      next: (data) => this.warehouses.set(data),
      error: (err) => console.error('Failed to load warehouses', err),
    });
  }
}
