import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';
import { TenantDto } from '@virtex/domain-admin-contracts';

@Injectable({ providedIn: 'root' })
export class TenantsFacade {
  private readonly tenantService = inject(TenantService);

  getTenants(): Observable<TenantDto[]> {
    return this.tenantService.getTenants();
  }
}
