import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class FinanceDashboardService {
  private http = inject(HttpClient);
  private translate = inject(TranslateService);

  getFinanceWidgets() {
    return [
       { id: 'ebitda', componentType: 'kpi-card', name: 'KPI: EBITDA', cols: 1, rows: 2, data: { title: 'EBITDA', value: '$1.2M', comparisonValue: '+5.2%', comparisonPeriod: 'vs Presupuesto', isPositive: true } },
       { id: 'net-margin', componentType: 'kpi-card', name: 'KPI: Margen Neto', cols: 1, rows: 2, data: { title: 'Margen Neto', value: '18.5%', comparisonValue: '-1.5%', comparisonPeriod: 'vs Año Anterior', isPositive: false } },
       { id: 'cash-flow-kpi', componentType: 'kpi-card', name: 'KPI: Cash Flow Libre', cols: 1, rows: 2, data: { title: 'Cash Flow Libre', value: '$350K', comparisonValue: '+20%', comparisonPeriod: 'vs Presupuesto', isPositive: true } },
       { id: 'debt-equity', componentType: 'kpi-card', name: 'KPI: Endeudamiento', cols: 1, rows: 2, data: { title: 'Endeudamiento (D/E)', value: '0.45', comparisonValue: '+0.05', comparisonPeriod: 'vs Q2', isPositive: false } },
       { id: 'financial-ratios', componentType: 'financial-ratios', name: 'KPIs: Ratios Financieros', cols: 4, rows: 2 },
       { id: 'real-vs-budget', componentType: 'comparison-chart', name: 'Gráfico Real vs. Presupuesto', cols: 2, rows: 5, chartType: 'column' },
       { id: 'cashflow-waterfall', componentType: 'cashflow-chart', name: 'Gráfico Flujo de Efectivo', cols: 2, rows: 4, chartType: 'waterfall' },
    ];
  }
}
