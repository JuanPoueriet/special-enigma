import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../core/config/api-base-url.token';
import { TenantDto, CreateTenantRequest } from '@virtex/domain-admin-contracts';

@Injectable({ providedIn: 'root' })
export class TenantsApiClient {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getTenants(): Observable<TenantDto[]> {
    return this.http.get<TenantDto[]>(`${this.apiBaseUrl}/admin/tenants`);
  }

  getTenant(id: string): Observable<TenantDto> {
    return this.http.get<TenantDto>(`${this.apiBaseUrl}/admin/tenants/${id}`);
  }

  createTenant(data: CreateTenantRequest): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/admin/tenants`, data);
  }

  getProvisioningStatus(id: string): Observable<any> {
      return this.http.get<any>(`${this.apiBaseUrl}/admin/tenants/${id}/provisioning-status`);
  }

  updateStatus(id: string, status: string, reason: string): Observable<any> {
      return this.http.patch<any>(`${this.apiBaseUrl}/admin/tenants/${id}/status`, { status, reason });
  }
}
