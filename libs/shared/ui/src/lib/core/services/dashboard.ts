import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { DashboardWidget } from '../../models/gridster-compat';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private translate = inject(TranslateService);
  private http = inject(HttpClient);

  layout = signal<DashboardWidget[]>([]);
  availableWidgets = signal<Omit<DashboardWidget, 'x' | 'y'>[]>([]);

  registerWidgets(widgets: Omit<DashboardWidget, 'x' | 'y'>[]) {
    this.availableWidgets.update(current => [...current, ...widgets]);
  }

  setLayout(newLayout: DashboardWidget[]) {
    this.layout.set(newLayout);
  }

  saveLayout(currentLayout: DashboardWidget[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboard_layout', JSON.stringify(currentLayout));
      this.layout.set(currentLayout);
    }
  }

  loadLayout(): void {
    if (typeof window !== 'undefined') {
      const savedLayout = localStorage.getItem('dashboard_layout');
      if (savedLayout) {
        this.layout.set(JSON.parse(savedLayout));
      }
    }
  }

  private t(key: string | undefined, fallback?: string): string {
    if (!key) return fallback ?? '';
    const v = this.translate.instant(key);
    return v === key ? (fallback ?? v) : v;
  }
}
