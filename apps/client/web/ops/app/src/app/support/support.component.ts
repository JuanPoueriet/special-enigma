import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportService } from './support.service';
import { Observable } from 'rxjs';
import { IncidentDto } from '@virteex/domain-admin-contracts';

@Component({
  selector: 'virteex-support',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-container">
      <div class="header">
        <h2>Operational Incident Management</h2>
        <p>Real-time response control for system and tenant-specific incidents.</p>
      </div>

      <div class="incident-list" *ngIf="incidents$ | async as incidents; else loading">
        <div class="incident-card" *ngFor="let incident of incidents" [attr.data-severity]="incident.severity">
           <div class="incident-header">
              <span class="severity-badge">{{ incident.severity }}</span>
              <span class="incident-id">#{{ incident.id | slice:0:6 }}</span>
              <span class="status-pill" [attr.data-status]="incident.status">{{ incident.status }}</span>
           </div>
           <div class="incident-content">
              <h3>{{ incident.title }}</h3>
              <div class="meta">
                 <span><strong>Service:</strong> {{ incident.service }}</span>
                 <span *ngIf="incident.tenantId"><strong>Tenant:</strong> {{ incident.tenantId }}</span>
                 <span><strong>Reported:</strong> {{ incident.createdAt | date:'short' }}</span>
              </div>
           </div>
           <div class="incident-actions">
              <button *ngIf="incident.status === 'OPEN'" class="btn btn-sm btn-primary" (click)="onAcknowledge(incident.id)">Acknowledge</button>
              <button *ngIf="incident.status !== 'RESOLVED'" class="btn btn-sm btn-success" (click)="onResolve(incident.id)">Resolve</button>
              <button class="btn btn-sm btn-outline">View Runbook</button>
           </div>
        </div>
        <div class="empty-state" *ngIf="!incidents.length">No active incidents detected. All systems nominal.</div>
      </div>

      <ng-template #loading>
        <div class="loading-state">Synchronizing with operational alert manager...</div>
      </ng-template>
    </div>
  `,
  styles: [`
    .module-container { padding: 32px; }
    .header { margin-bottom: 32px; }
    .header h2 { margin: 0; color: #1a202c; }
    .header p { margin: 8px 0 0; color: #718096; }

    .incident-list { display: flex; flex-direction: column; gap: 20px; }
    .incident-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; display: flex; flex-direction: column; }
    .incident-card[data-severity="CRITICAL"] { border-left: 6px solid #f56565; }
    .incident-card[data-severity="HIGH"] { border-left: 6px solid #ed8936; }
    .incident-card[data-severity="MEDIUM"] { border-left: 6px solid #ecc94b; }
    .incident-card[data-severity="LOW"] { border-left: 6px solid #4299e1; }

    .incident-header { display: flex; align-items: center; gap: 12px; padding: 12px 20px; background: #f7fafc; border-bottom: 1px solid #edf2f7; }
    .severity-badge { font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: #2d3748; color: white; }
    .incident-id { font-family: monospace; font-size: 0.8rem; color: #a0aec0; }
    .status-pill { font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 9999px; }
    .status-pill[data-status="OPEN"] { background: #fff5f5; color: #c53030; }
    .status-pill[data-status="ACKNOWLEDGED"] { background: #ebf8ff; color: #2b6cb0; }
    .status-pill[data-status="RESOLVED"] { background: #f0fff4; color: #2f855a; }

    .incident-content { padding: 20px; }
    .incident-content h3 { margin: 0 0 12px; font-size: 1.1rem; color: #2d3748; }
    .meta { display: flex; gap: 24px; font-size: 0.85rem; color: #718096; }
    .meta span strong { color: #4a5568; }

    .incident-actions { padding: 12px 20px; background: #f7fafc; border-top: 1px solid #edf2f7; display: flex; gap: 12px; justify-content: flex-end; }
    .btn { padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
    .btn-primary { background: #3182ce; color: white; }
    .btn-success { background: #38a169; color: white; }
    .btn-outline { background: white; border-color: #e2e8f0; color: #4a5568; }

    .loading-state { padding: 100px; text-align: center; color: #718096; }
    .empty-state { padding: 64px; text-align: center; color: #a0aec0; font-style: italic; background: white; border-radius: 12px; border: 1px dashed #cbd5e0; }
  `]
})
export class SupportComponent implements OnInit {
  private supportService = inject(SupportService);
  incidents$!: Observable<IncidentDto[]>;

  ngOnInit() {
    this.loadIncidents();
  }

  loadIncidents() {
    this.incidents$ = this.supportService.getIncidents();
  }

  onAcknowledge(id: string) {
    this.supportService.acknowledge(id).subscribe(() => this.loadIncidents());
  }

  onResolve(id: string) {
    this.supportService.resolve(id).subscribe(() => this.loadIncidents());
  }
}
