import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../core/operations/operations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'virteex-queues',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-container">
      <h2>Asynchronous Processing Control</h2>
      <div class="queue-list" *ngIf="queues$ | async as queues; else loading">
        <div class="queue-card" *ngFor="let q of queues">
           <div class="status-pill" [class.healthy]="q.status === 'HEALTHY'" [class.busy]="q.status === 'BUSY'">{{ q.status }}</div>
           <div class="name"><strong>{{ q.name }}</strong></div>
           <div class="metrics">
              <div class="m"><span class="label">Pending</span><span class="val">{{ q.pending }}</span></div>
              <div class="m"><span class="label">Processing</span><span class="val">{{ q.processing }}</span></div>
              <div class="m"><span class="label">Failed</span><span class="val danger">{{ q.failed }}</span></div>
           </div>
           <div class="actions">
              <button class="btn-sm">Flush</button>
              <button class="btn-sm">Retry Failed</button>
           </div>
        </div>
      </div>
      <ng-template #loading><div class="loading">Monitoring workers...</div></ng-template>
    </div>
  `,
  styles: [`
    .module-container { padding: 32px; }
    .queue-list { display: flex; flex-direction: column; gap: 20px; }
    .queue-card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 32px; }
    .status-pill { font-size: 0.7rem; font-weight: bold; padding: 4px 10px; border-radius: 9999px; background: #cbd5e0; color: white; width: 80px; text-align: center; }
    .status-pill.healthy { background: #48bb78; }
    .status-pill.busy { background: #ecc94b; }
    .name { flex: 1; color: #2d3748; }
    .metrics { display: flex; gap: 24px; }
    .m { display: flex; flex-direction: column; width: 80px; }
    .label { font-size: 0.7rem; color: #718096; text-transform: uppercase; }
    .val { font-weight: 700; color: #2d3748; }
    .val.danger { color: #f56565; }
    .actions { display: flex; gap: 12px; }
    .btn-sm { padding: 6px 12px; font-size: 0.8rem; border-radius: 6px; border: 1px solid #e2e8f0; background: white; cursor: pointer; }
    .loading { padding: 48px; text-align: center; color: #718096; }
  `]
})
export class QueuesComponent implements OnInit {
  private opsService = inject(OperationsService);
  queues$!: Observable<any[]>;
  ngOnInit() { this.queues$ = this.opsService.getQueues(); }
}
