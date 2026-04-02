import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/config/api-base-url.token';

export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.apiBaseUrl}/subscription/plans`);
  }
}
