import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../core/operations/operations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'virtex-releases',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-container">
      <div class="header">
        <h2>Ecosystem Release Log</h2>
        <p>Deployment history of system services across regions.</p>
      </div>

      <div class="release-timeline" *ngIf="releases$ | async as releases; else loading">
        <div class="release-item" *ngFor="let r of releases">
           <div class="marker" [attr.data-status]="r.status"></div>
           <div class="content">
              <div class="top-row">
                 <strong class="version">{{ r.version }}</strong>
                 <span class="env-tag">{{ r.environment }}</span>
                 <span class="status-badge" [attr.data-status]="r.status">{{ r.status }}</span>
              </div>
              <div class="meta">
                 <span>Deployed at {{ r.deployedAt | date:'medium' }}</span>
                 <span>Author: {{ r.author }}</span>
              </div>
           </div>
        </div>
        <div class="empty-state" *ngIf="!releases.length">No release history found.</div>
      </div>

      <ng-template #loading>
        <div class="loading">Loading ecosystem metadata...</div>
      </ng-template>
    </div>
  `,
  styles: [`
    .module-container { padding: 32px; }
    .header { margin-bottom: 48px; }
    .header h2 { margin: 0; color: #1a202c; }
    .header p { margin: 8px 0 0; color: #718096; }

    .release-timeline { display: flex; flex-direction: column; gap: 0; padding-left: 12px; border-left: 2px solid #e2e8f0; }
    .release-item { display: flex; align-items: flex-start; gap: 24px; padding-bottom: 32px; position: relative; left: -7px; }
    .marker { width: 12px; height: 12px; border-radius: 50%; background: #cbd5e0; border: 2px solid white; z-index: 10; }
    .marker[data-status="STABLE"] { background: #48bb78; box-shadow: 0 0 0 4px #c6f6d5; }
    .marker[data-status="REPLACED"] { background: #a0aec0; }

    .content { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px 20px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
    .top-row { display: flex; align-items: center; gap: 12px; }
    .version { font-size: 1.1rem; color: #1a202c; }
    .env-tag { font-size: 0.75rem; text-transform: uppercase; padding: 2px 6px; background: #edf2f7; color: #4a5568; border-radius: 4px; font-weight: bold; }
    .status-badge { font-size: 0.7rem; font-weight: bold; }
    .status-badge[data-status="STABLE"] { color: #38a169; }
    .status-badge[data-status="REPLACED"] { color: #718096; }

    .meta { display: flex; gap: 24px; font-size: 0.8rem; color: #a0aec0; }
    .loading { padding: 48px; text-align: center; color: #718096; }
    .empty-state { padding: 48px; text-align: center; color: #a0aec0; }
  `]
})
export class ReleasesComponent implements OnInit {
  private opsService = inject(OperationsService);
  releases$!: Observable<any[]>;
  ngOnInit() { this.releases$ = this.opsService.getReleases(); }
}
