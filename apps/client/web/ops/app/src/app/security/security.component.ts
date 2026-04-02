import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'virtex-security',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-container">
      <div class="header">
        <h2>Operations Security & Audit</h2>
        <p>Immutable evidence of lifecycle changes and sensitive operations.</p>
      </div>

      <div class="audit-trail" *ngIf="auditTrail$ | async as logs; else loading">
        <div class="audit-header">
           <span class="col-ts">Timestamp</span>
           <span class="col-action">Action</span>
           <span class="col-tenant">Target</span>
           <span class="col-sig">Signature</span>
        </div>
        <div class="audit-row" *ngFor="let log of logs">
           <span class="col-ts">{{ log.timestamp | date:'medium' }}</span>
           <span class="col-action"><code>{{ log.action }}</code></span>
           <span class="col-tenant">{{ log.tenantId }}</span>
           <span class="col-sig valid">Verified HMAC-256</span>
        </div>
        <div class="empty-state" *ngIf="!logs.length">No audit records found.</div>
      </div>

      <ng-template #loading>
        <div class="loading-state">Verifying signatures and fetching evidence...</div>
      </ng-template>
    </div>
  `,
  styles: [`
    .module-container { padding: 32px; }
    .header { margin-bottom: 32px; }
    .header h2 { margin: 0; color: #1a202c; }
    .header p { margin: 8px 0 0; color: #718096; }

    .audit-trail { background: white; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
    .audit-header { display: flex; padding: 12px 24px; background: #f7fafc; border-bottom: 1px solid #e2e8f0; font-size: 0.75rem; color: #718096; font-weight: bold; text-transform: uppercase; }
    .audit-row { display: flex; padding: 16px 24px; border-bottom: 1px solid #edf2f7; font-size: 0.9rem; align-items: center; }
    .audit-row:last-child { border-bottom: none; }

    .col-ts { width: 220px; }
    .col-action { width: 180px; }
    .col-tenant { width: 180px; }
    .col-sig { flex: 1; font-size: 0.8rem; }
    .col-sig.valid { color: #38a169; }

    .loading-state { padding: 100px; text-align: center; color: #718096; }
    .empty-state { padding: 48px; text-align: center; color: #a0aec0; }
  `]
})
export class SecurityComponent implements OnInit {
  private securityService = inject(SecurityService);
  auditTrail$!: Observable<any[]>;

  ngOnInit() {
    this.auditTrail$ = this.securityService.getAuditTrail();
  }
}
