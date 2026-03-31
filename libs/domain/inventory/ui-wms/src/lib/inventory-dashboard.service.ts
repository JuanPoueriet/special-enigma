import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InventoryDashboardService {
  private http = inject(HttpClient);

  getInventoryWidgets() {
    return [
       { id: 'low-stock-items', componentType: 'stat-card', name: 'Productos Bajos', cols: 1, rows: 1, data: { title: 'Productos Bajos', value: '8', change: '+2', iconName: 'Package', color: 'red' } },
       { id: 'low-stock-table', componentType: 'low-stock', name: 'Tabla de Bajo Stock', cols: 1, rows: 4 },
    ];
  }
}
