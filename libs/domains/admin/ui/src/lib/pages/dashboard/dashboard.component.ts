import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { API_URL } from '@virteex/shared-config';

interface DashboardMetrics {
  mrr: number;
  activeTenants: number;
  churnRate: number;
}

@Component({
  selector: 'virteex-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">SaaS Overview</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" *ngIf="metrics() as data">
        <!-- MRR Card -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider">MRR</h3>
          <div class="mt-2 flex items-baseline">
            <span class="text-3xl font-semibold text-gray-900">{{ data.mrr | currency:'USD' }}</span>
          </div>
        </div>

        <!-- Active Tenants Card -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Tenants</h3>
          <div class="mt-2 flex items-baseline">
            <span class="text-3xl font-semibold text-gray-900">{{ data.activeTenants }}</span>
          </div>
        </div>

        <!-- Churn Rate Card -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wider">Churn Rate</h3>
          <div class="mt-2 flex items-baseline">
            <span class="text-3xl font-semibold text-gray-900">{{ data.churnRate }}%</span>
          </div>
        </div>
      </div>

      <div *ngIf="!metrics()" class="text-center py-10">
        <p class="text-gray-500">Loading metrics...</p>
      </div>
    </div>
  `
})
export class DashboardComponent {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  metrics = toSignal(this.http.get<DashboardMetrics>(`${this.apiUrl}/admin/dashboard/metrics`));
}
