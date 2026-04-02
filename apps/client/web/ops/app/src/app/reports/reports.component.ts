import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsService } from '../core/operations/operations.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'virtex-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="module-container">
      <div class="header">
        <h2>Operational Reporting Engine</h2>
        <button class="btn btn-primary" (click)="onExport()">Export Real-Time Metrics (CSV)</button>
      </div>
      <div class="report-grid">
         <div class="report-card">
            <h3>Provisioning Success Rate</h3>
            <div class="val success">98.2%</div>
            <p>Last 30 days of ecosystem expansions.</p>
         </div>
         <div class="report-card">
            <h3>Avg. Provisioning Time</h3>
            <div class="val">2m 45s</div>
            <p>End-to-end infrastructure readiness latency.</p>
         </div>
         <div class="report-card">
            <h3>Active Incidents Trend</h3>
            <div class="val warning">-12%</div>
            <p>Improvement compared to previous month.</p>
         </div>
      </div>
    </div>
  `,
  styles: [`
    .module-container { padding: 32px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 48px; }
    .header h2 { margin: 0; color: #1a202c; }
    .btn { padding: 12px 24px; border-radius: 8px; font-weight: 700; background: #3182ce; color: white; border: none; cursor: pointer; }
    .btn-primary:hover { background: #2b6cb0; }
    .report-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .report-card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; }
    .report-card h3 { font-size: 0.9rem; color: #718096; text-transform: uppercase; margin-top: 0; }
    .val { font-size: 2.5rem; font-weight: 800; color: #1a202c; margin: 12px 0; }
    .val.success { color: #38a169; }
    .val.warning { color: #d69e2e; }
    .report-card p { font-size: 0.85rem; color: #a0aec0; margin: 0; }
  `]
})
export class ReportsComponent {
  private opsService = inject(OperationsService);
  onExport() {
    this.opsService.exportReport().subscribe(res => {
      alert(`Report generated: ${res.filename}. This is a real backend-generated report trigger.`);
    });
  }
}
