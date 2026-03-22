import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TenantService } from './tenant.service';
import { TenantsTableComponent } from './components/tenants-table.component';
import { TenantDto } from '@virteex/domain-admin-contracts';

@Component({
  selector: 'virteex-tenants-page-container',
  standalone: true,
  imports: [CommonModule, TenantsTableComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h2>Enterprise Tenant Catalog</h2>
          <p>Orchestrate isolation, provisioning, and lifecycle of ecosystem participants.</p>
        </div>
        <button class="btn btn-primary" (click)="onNewTenant()">
          <span class="icon">+</span> Provision New Tenant
        </button>
      </div>

      <div class="filters-bar">
         <input type="text" placeholder="Search by ID, name or region..." class="search-input" />
         <div class="filter-actions">
            <button class="btn-secondary" (click)="loadTenants()">🔄 Refresh</button>
         </div>
      </div>

      <virteex-tenants-table
        [tenants]="tenants"
        (view)="onView($event)"
        (suspend)="onSuspend($event)"
        (activate)="onActivate($event)"
      />
    </div>
  `,
  styles: [`
    .page-container { padding: 32px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .title-section h2 { margin: 0; color: #1a202c; font-size: 1.5rem; }
    .title-section p { margin: 8px 0 0; color: #718096; font-size: 0.95rem; }

    .filters-bar { display: flex; justify-content: space-between; margin-bottom: 24px; gap: 16px; }
    .search-input { flex: 1; padding: 10px 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem; }

    .btn { padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; }
    .btn-primary { background: #3182ce; color: white; }
    .btn-primary:hover { background: #2b6cb0; }
    .btn-secondary { background: white; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 6px; cursor: pointer; color: #4a5568; }
  `]
})
export class TenantsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly tenantService = inject(TenantService);

  tenants: TenantDto[] = [];

  ngOnInit() {
    this.loadTenants();
  }

  loadTenants(): void {
    this.tenantService.getTenants().subscribe(data => {
      this.tenants = data;
    });
  }

  onNewTenant(): void {
    this.router.navigate(['/tenants/create']);
  }

  onView(id: string): void {
    this.router.navigate(['/tenants', id]);
  }

  onSuspend(id: string): void {
    if (confirm(`Are you sure you want to SUSPEND tenant ${id}? Access will be blocked immediately.`)) {
      this.tenantService.updateStatus(id, 'SUSPENDED', 'Operational suspension via admin console').subscribe(() => {
        this.loadTenants();
      });
    }
  }

  onActivate(id: string): void {
    this.tenantService.updateStatus(id, 'ACTIVE', 'Re-activation via admin console').subscribe(() => {
      this.loadTenants();
    });
  }
}
