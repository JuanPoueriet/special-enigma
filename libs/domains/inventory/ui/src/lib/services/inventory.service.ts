import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@virteex/shared-ui';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);

  constructor(@Inject(API_URL) private apiUrl: string) {}

  getWarehouses(tenantId: string = 'default'): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/inventory/warehouses?tenantId=${tenantId}`,
    );
  }
}
