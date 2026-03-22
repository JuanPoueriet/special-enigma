import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from './tenant.service';
import { TenantDto } from '@virteex/domain-admin-contracts';
import { switchMap, timer, takeWhile } from 'rxjs';

@Component({
  selector: 'virteex-tenant-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container" *ngIf="tenant">
      <div class="breadcrumb">
        <a (click)="goBack()">Tenants</a> / {{ tenant.id }}
      </div>

      <div class="page-header">
        <div class="title-section">
          <h2>{{ tenant.id }} <span class="badge">{{ tenant.plan }}</span></h2>
          <p>Created on {{ tenant.createdAt | date:'medium' }}</p>
        </div>
        <div class="actions">
           <button *ngIf="tenant.status === 'ACTIVE'" class="btn btn-warning" (click)="onSuspend()">Suspend Access</button>
           <button *ngIf="tenant.status === 'SUSPENDED'" class="btn btn-success" (click)="onActivate()">Activate Access</button>
        </div>
      </div>

      <div class="grid-layout">
        <div class="card main-info">
          <h3>Technical Configuration</h3>
          <div class="info-row">
            <span class="label">Isolation Mode</span>
            <span class="value"><code>{{ tenant.mode }}</code></span>
          </div>
          <div class="info-row">
            <span class="label">Primary Region</span>
            <span class="value">{{ tenant.primaryRegion }}</span>
          </div>
          <div class="info-row">
            <span class="label">Status</span>
            <span class="value status-badge" [attr.data-status]="tenant.status">{{ tenant.status }}</span>
          </div>
        </div>

        <div class="card provisioning" *ngIf="tenant.status === 'PROVISIONING' || provisioningStatus">
          <h3>Infrastructure Provisioning</h3>
          <div class="provisioning-progress">
             <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="getProgress()"></div>
             </div>
             <p class="status-msg">{{ provisioningStatus?.status || 'Initializing...' }}</p>
          </div>
          <div class="provisioning-details">
             <div class="step" [class.done]="isStepDone('DATABASE_CREATION')">Database Instance</div>
             <div class="step" [class.done]="isStepDone('SCHEMA_MIGRATION')">Schema & Migrations</div>
             <div class="step" [class.done]="isStepDone('SEEDING')">Base Data Seeding</div>
             <div class="step" [class.done]="isStepDone('COMPLETED')">Smoke Testing</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 32px; }
    .breadcrumb { margin-bottom: 24px; color: #718096; font-size: 0.9rem; }
    .breadcrumb a { cursor: pointer; color: #3182ce; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; }
    .badge { font-size: 0.8rem; background: #ebf8ff; color: #2b6cb0; padding: 4px 12px; border-radius: 9999px; margin-left: 12px; }

    .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; }
    .card h3 { margin-top: 0; font-size: 1.1rem; color: #2d3748; margin-bottom: 20px; }

    .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #edf2f7; }
    .info-row:last-child { border-bottom: none; }
    .label { color: #718096; font-weight: 500; }
    .value { color: #2d3748; font-weight: 600; }

    .status-badge { padding: 2px 10px; border-radius: 9999px; font-size: 0.75rem; }
    .status-badge[data-status="ACTIVE"] { background: #c6f6d5; color: #22543d; }
    .status-badge[data-status="PROVISIONING"] { background: #feebc8; color: #744210; }
    .status-badge[data-status="SUSPENDED"] { background: #fed7d7; color: #822727; }

    .provisioning-progress { margin: 20px 0; }
    .progress-bar { height: 8px; background: #edf2f7; border-radius: 4px; overflow: hidden; margin-bottom: 12px; }
    .progress-fill { height: 100%; background: #3182ce; transition: width 0.5s ease; }
    .status-msg { font-size: 0.9rem; color: #4a5568; font-weight: 600; }

    .step { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #a0aec0; margin-bottom: 8px; }
    .step::before { content: '○'; }
    .step.done { color: #38a169; font-weight: 600; }
    .step.done::before { content: '✓'; }

    .btn { padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; }
    .btn-warning { background: #ecc94b; color: #744210; }
    .btn-success { background: #48bb78; color: white; }
  `]
})
export class TenantDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private tenantService = inject(TenantService);

  tenant?: TenantDto;
  provisioningStatus?: any;

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => this.tenantService.getTenant(params['id']))
    ).subscribe(tenant => {
      this.tenant = tenant;
      if (tenant.status === 'PROVISIONING') {
        this.pollProvisioningStatus(tenant.id);
      }
    });
  }

  pollProvisioningStatus(id: string) {
    timer(0, 3000).pipe(
      switchMap(() => this.tenantService.getProvisioningStatus(id)),
      takeWhile(status => status.status !== 'COMPLETED' && status.status !== 'FAILED', true)
    ).subscribe(status => {
      this.provisioningStatus = status;
      if (status.status === 'COMPLETED') {
        this.tenant!.status = 'ACTIVE';
      }
    });
  }

  getProgress(): number {
    const steps = ['STARTING', 'DATABASE_CREATION', 'SCHEMA_MIGRATION', 'SEEDING', 'SMOKE_TESTING', 'COMPLETED'];
    const current = this.provisioningStatus?.status || 'STARTING';
    const index = steps.indexOf(current);
    return Math.max(0, (index / (steps.length - 1)) * 100);
  }

  isStepDone(step: string): boolean {
    const steps = ['STARTING', 'DATABASE_CREATION', 'SCHEMA_MIGRATION', 'SEEDING', 'SMOKE_TESTING', 'COMPLETED'];
    const current = this.provisioningStatus?.status || 'STARTING';
    return steps.indexOf(current) >= steps.indexOf(step);
  }

  goBack() {
    this.router.navigate(['/tenants']);
  }

  onSuspend() {
    if (this.tenant) {
      this.tenantService.updateStatus(this.tenant.id, 'SUSPENDED', 'Admin request').subscribe(() => {
        this.tenant!.status = 'SUSPENDED';
      });
    }
  }

  onActivate() {
    if (this.tenant) {
      this.tenantService.updateStatus(this.tenant.id, 'ACTIVE', 'Admin request').subscribe(() => {
        this.tenant!.status = 'ACTIVE';
      });
    }
  }
}
