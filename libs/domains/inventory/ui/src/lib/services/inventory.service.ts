import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@virteex/shared-config';

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  location: string;
  tenantId: string;
  description?: string;
  isActive?: boolean;
}

export interface RegisterMovementDto {
  productId: string;
  warehouseId: string;
  type: 'IN' | 'OUT' | 'TRANSFER' | 'ADJUSTMENT';
  quantity: string;
  reference: string;
  locationId?: string;
  tenantId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL) private readonly apiUrl: string
  ) {}

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(`${this.apiUrl}/inventory/warehouses`);
  }

  getWarehouse(id: string): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${this.apiUrl}/inventory/warehouses/${id}`);
  }

  createWarehouse(warehouse: Partial<Warehouse>): Observable<Warehouse> {
    return this.http.post<Warehouse>(`${this.apiUrl}/inventory/warehouses`, warehouse);
  }

  updateWarehouse(id: string, warehouse: Partial<Warehouse>): Observable<Warehouse> {
    return this.http.put<Warehouse>(`${this.apiUrl}/inventory/warehouses/${id}`, warehouse);
  }

  deleteWarehouse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inventory/warehouses/${id}`);
  }

  registerMovement(movement: RegisterMovementDto): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/inventory/movements`, movement);
  }

  checkStock(warehouseId: string, productSku: string, quantity: number): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(
      `${this.apiUrl}/inventory/check/${warehouseId}/${productSku}?quantity=${quantity}`
    );
  }
}
