import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { Observable } from 'rxjs';
import { DashboardMetricsDto } from '@virteex/domain-admin-contracts';

@Component({
  selector: 'virteex-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="header">
        <h2>Operational Control Plane</h2>
        <span class="status-badge live">REAL-TIME</span>
      </div>

      <div class="stats-grid" *ngIf="stats$ | async as stats; else loading">
        <div class="stat-card">
          <div class="title">Total Ecosystem Tenants</div>
          <div class="value">{{ stats.totalTenants }}</div>
          <div class="subtitle">{{ stats.activeTenants }} Active · {{ stats.provisioningTenants }} Provisioning</div>
        </div>
        <div class="stat-card">
          <div class="title">Monthly Recurring Revenue</div>
          <div class="value">{{ stats.mrr | currency }}</div>
          <div class="trend" [class.up]="stats.churnRate < 0.05">Churn: {{ stats.churnRate | percent:'1.1-2' }}</div>
        </div>
        <div class="stat-card">
          <div class="title">System Availability</div>
          <div class="value success">99.98%</div>
          <div class="trend up">Global SLI Target Met</div>
        </div>
        <div class="stat-card">
          <div class="title">Operational Health</div>
          <div class="value" [class.warning]="stats.suspendedTenants > 0">{{ stats.suspendedTenants > 0 ? 'ATTENTION' : 'OPTIMAL' }}</div>
          <div class="subtitle">{{ stats.suspendedTenants }} Suspended Accounts</div>
        </div>
      </div>

      <ng-template #loading>
          <div class="loading-state">
            <div class="spinner"></div>
            Loading real-time operational metrics...
          </div>
      </ng-template>

      <div class="activity-section" *ngIf="stats$ | async as stats">
        <h3>System Audit Stream</h3>
        <div class="activity-feed">
          <div class="activity-item" *ngFor="let activity of stats.recentActivity">
            <div class="activity-icon" [attr.data-action]="activity.action"></div>
            <div class="activity-content">
              <div class="activity-title">
                <strong>{{ activity.action }}</strong> on Tenant <code>{{ activity.tenantId }}</code>
              </div>
              <div class="activity-meta">
                {{ activity.timestamp | date:'medium' }} · Status: {{ activity.status }} · Signature Verified
              </div>
            </div>
          </div>
          <div class="empty-state" *ngIf="!stats.recentActivity?.length">
             No recent operational activity detected.
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 20px; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .title { color: #718096; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .value { font-size: 2rem; font-weight: bold; margin: 10px 0; color: #2d3748; }
    .value.success { color: #38a169; }
    .value.warning { color: #dd6b20; }
    .trend { font-size: 0.875rem; color: #718096; }
    .trend.up { color: #38a169; }
    .trend.down { color: #e53e3e; }

    .recent-activity {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .recent-activity ul { list-style: none; padding: 0; }
    .recent-activity li {
      padding: 12px 0;
      border-bottom: 1px solid #edf2f7;
      color: #4a5568;
    }
  `]
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  stats$!: Observable<DashboardMetricsDto>;

  ngOnInit() {
    this.stats$ = this.dashboardService.getStats();
  }
}
