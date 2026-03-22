import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../core/operations/operations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'virteex-backups',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-container">
      <h2>Database Snapshots & DR</h2>
      <div class="grid" *ngIf="backups$ | async as backups; else loading">
        <div class="card" *ngFor="let b of backups">
          <div class="status-indicator" [class.success]="b.status === 'SUCCESS'"></div>
          <div class="info">
            <strong>{{ b.id }}</strong>
            <span>{{ b.type }} Snapshot · {{ b.size }}</span>
            <small>{{ b.createdAt | date:'medium' }}</small>
          </div>
          <div class="actions">
            <button class="btn-sm">Restore</button>
            <button class="btn-sm">Verify</button>
          </div>
        </div>
      </div>
      <ng-template #loading>
        <div class="loading">Fetching snapshot history...</div>
      </ng-template>
    </div>
  `,
  styles: [`
    .module-container { padding: 32px; }
    .grid { display: flex; flex-direction: column; gap: 16px; }
    .card { background: white; padding: 16px 24px; border-radius: 8px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 20px; }
    .status-indicator { width: 12px; height: 12px; border-radius: 50%; background: #cbd5e0; }
    .status-indicator.success { background: #48bb78; }
    .info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .info strong { color: #2d3748; }
    .info span { font-size: 0.85rem; color: #4a5568; }
    .info small { font-size: 0.75rem; color: #a0aec0; }
    .actions { display: flex; gap: 10px; }
    .btn-sm { padding: 4px 12px; font-size: 0.8rem; border-radius: 4px; border: 1px solid #e2e8f0; background: white; cursor: pointer; }
    .loading { padding: 48px; text-align: center; color: #718096; }
  `]
})
export class BackupsComponent implements OnInit {
  private opsService = inject(OperationsService);
  backups$!: Observable<any[]>;
  ngOnInit() { this.backups$ = this.opsService.getBackups(); }
}
