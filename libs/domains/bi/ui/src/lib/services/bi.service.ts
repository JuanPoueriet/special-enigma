import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@virteex/shared-ui';

export interface TopProduct {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class BiService {
  private http = inject(HttpClient);

  constructor(@Inject(API_URL) private apiUrl: string) {}

  getTopProducts(tenantId: string = 'default'): Observable<TopProduct[]> {
    return this.http.get<TopProduct[]>(`${this.apiUrl}/bi/top-products?tenantId=${tenantId}`);
  }
}
