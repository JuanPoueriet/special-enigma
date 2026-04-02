import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/config/api-base-url.token';
import { DashboardMetricsDto } from '@virtex/domain-admin-contracts';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getStats(): Observable<DashboardMetricsDto> {
    return this.http.get<DashboardMetricsDto>(`${this.apiBaseUrl}/admin/dashboard/metrics`);
  }
}
