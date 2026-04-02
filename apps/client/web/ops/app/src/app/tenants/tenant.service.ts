import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TenantsApiClient } from './tenants-api.client';
import { TenantDto, CreateTenantRequest } from '@virtex/domain-admin-contracts';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private readonly apiClient = inject(TenantsApiClient);

  getTenants(): Observable<TenantDto[]> {
    return this.apiClient.getTenants();
  }

  getTenant(id: string): Observable<TenantDto> {
    return this.apiClient.getTenant(id);
  }

  createTenant(data: CreateTenantRequest): Observable<any> {
    return this.apiClient.createTenant(data);
  }

  getProvisioningStatus(id: string): Observable<any> {
      return this.apiClient.getProvisioningStatus(id);
  }

  updateStatus(id: string, status: string, reason: string): Observable<any> {
      return this.apiClient.updateStatus(id, status, reason);
  }
}
