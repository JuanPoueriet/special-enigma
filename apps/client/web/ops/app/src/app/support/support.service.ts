import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/config/api-base-url.token';
import { IncidentDto } from '@virtex/domain-admin-contracts';

@Injectable({ providedIn: 'root' })
export class SupportService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getIncidents(): Observable<IncidentDto[]> {
    return this.http.get<IncidentDto[]>(`${this.apiBaseUrl}/admin/incidents`);
  }

  acknowledge(id: string): Observable<any> {
    return this.http.patch(`${this.apiBaseUrl}/admin/incidents/${id}/acknowledge`, {});
  }

  resolve(id: string): Observable<any> {
    return this.http.patch(`${this.apiBaseUrl}/admin/incidents/${id}/resolve`, {});
  }
}
