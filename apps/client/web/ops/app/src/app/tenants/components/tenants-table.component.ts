import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantDto } from '@virtex/domain-admin-contracts';

@Component({
  selector: 'virtex-tenants-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Identifier</th>
            <th>Isolation</th>
            <th>Region</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (tenant of tenants; track tenant.id) {
            <tr>
              <td>
                <div class="tenant-id-cell">
                  <strong>{{ tenant.id }}</strong>
                  <span class="plan-label">{{ tenant.plan }}</span>
                </div>
              </td>
              <td><code>{{ tenant.mode }}</code></td>
              <td>{{ tenant.primaryRegion }}</td>
              <td>{{ tenant.createdAt | date:'short' }}</td>
              <td>
                <span class="status-badge" [attr.data-status]="tenant.status">
                  {{ tenant.status }}
                </span>
              </td>
              <td class="actions-cell">
                <button class="btn-icon" (click)="view.emit(tenant.id)" title="View Details">
                   <span class="icon">👁️</span>
                </button>
                <button *ngIf="tenant.status === 'ACTIVE'" class="btn-icon warning" (click)="suspend.emit(tenant.id)" title="Suspend Tenant">
                   <span class="icon">⏸️</span>
                </button>
                <button *ngIf="tenant.status === 'SUSPENDED'" class="btn-icon success" (click)="activate.emit(tenant.id)" title="Activate Tenant">
                   <span class="icon">▶️</span>
                </button>
              </td>
            </tr>
          } @empty {
            <tr><td colspan="6" class="empty-row">No enterprise tenants registered.</td></tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-container { background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; }
    .data-table th { background: #f7fafc; padding: 12px 24px; font-size: 0.75rem; text-transform: uppercase; color: #718096; border-bottom: 1px solid #e2e8f0; }
    .data-table td { padding: 16px 24px; border-bottom: 1px solid #edf2f7; font-size: 0.9rem; color: #2d3748; }
    .tenant-id-cell { display: flex; flex-direction: column; gap: 4px; }
    .plan-label { font-size: 0.7rem; background: #ebf8ff; color: #2b6cb0; padding: 2px 6px; border-radius: 4px; width: fit-content; font-weight: bold; }

    .status-badge { padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
    .status-badge[data-status="ACTIVE"] { background: #c6f6d5; color: #22543d; }
    .status-badge[data-status="PROVISIONING"] { background: #feebc8; color: #744210; }
    .status-badge[data-status="SUSPENDED"] { background: #fed7d7; color: #822727; }

    .actions-cell { display: flex; gap: 8px; }
    .btn-icon { background: none; border: 1px solid #e2e8f0; border-radius: 4px; padding: 4px 8px; cursor: pointer; transition: all 0.2s; }
    .btn-icon:hover { background: #f7fafc; }
    .btn-icon.warning:hover { border-color: #ecc94b; color: #b7791f; }
    .btn-icon.success:hover { border-color: #68d391; color: #2f855a; }

    .empty-row { padding: 40px !important; text-align: center; color: #a0aec0; font-style: italic; }
  `]
})
export class TenantsTableComponent {
  @Input({ required: true }) tenants: TenantDto[] = [];
  @Output() view = new EventEmitter<string>();
  @Output() suspend = new EventEmitter<string>();
  @Output() activate = new EventEmitter<string>();
}
