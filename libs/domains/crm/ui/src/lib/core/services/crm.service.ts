import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@virteex/shared-ui';
import { Product } from '../models/product.model';
import { Sale } from '../models/sale.model';

@Injectable({
  providedIn: 'root',
})
export class CrmService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  createSale(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crm/sales`, payload);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/catalog/products`);
  }

  getSales(tenantId: string = 'default'): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/crm/sales?tenantId=${tenantId}`);
  }
}
