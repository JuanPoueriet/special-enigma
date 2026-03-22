import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config/api-base-url.token';

@Injectable({ providedIn: 'root' })
export class OperationsService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getBackups(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/admin/operations/backups`);
  }

  getQueues(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/admin/operations/queues`);
  }

  getReleases(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/admin/operations/releases`);
  }

  exportReport(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/admin/operations/reports/export`);
  }
}
