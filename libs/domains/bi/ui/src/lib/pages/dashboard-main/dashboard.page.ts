import { Component, ChangeDetectionStrategy, inject, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterModule, GridsterConfig, GridType, CompactType, DisplayGrid } from 'angular-gridster2';
import { DashboardService, DashboardWidget } from '@virteex/bi-ui/lib/core/services/dashboard';

// ✅ CORRECCIÓN: Se importan TODOS los componentes de widgets que se usarán en la plantilla
import { KpiCard } from '@virteex/bi-ui/lib/shared/components/kpi-card/kpi-card';
import { StatCard } from '@virteex/bi-ui/lib/shared/components/stat-card/stat-card';
import { ComparisonChart } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/comparison-chart/comparison-chart';
import { AlertsPanel } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/alerts-panel/alerts-panel';
import { SalesChart } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/sales-chart/sales-chart';
import { InvoiceStatus } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/invoice-status/invoice-status';
import { LowStockProducts } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/low-stock-products/low-stock-products';
import { TopProductsChart } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/top-products-chart/top-products-chart';
import { RecentActivity } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/recent-activity/recent-activity';
import { LucideAngularModule, LayoutDashboard, Settings, Plus, X, Trash } from 'lucide-angular';
import { AuthService } from '@virteex/bi-ui/lib/core/services/auth';
import { CashflowChart } from "@virteex/bi-ui/lib/pages/dashboard-main/widgets/cashflow-chart/cashflow-chart";
import { ExpensesChart } from "@virteex/bi-ui/lib/pages/dashboard-main/widgets/expenses-chart/expenses-chart";
import { ArAgingChart } from "@virteex/bi-ui/lib/pages/dashboard-main/widgets/ar-aging-chart/ar-aging-chart";
import { FinancialRatios } from "@virteex/bi-ui/lib/pages/dashboard-main/widgets/financial-ratios/financial-ratios";
import { KpiRoe } from "@virteex/bi-ui/lib/pages/dashboard-main/widgets/kpi-roe/kpi-roe";
import { KpiRoa } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/kpi-roa/kpi-roa';
import { KpiCurrentRatio } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/kpi-current-ratio/kpi-current-ratio';
import { KpiQuickRatio } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/kpi-quick-ratio/kpi-quick-ratio';
import { KpiWorkingCapital } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/kpi-working-capital/kpi-working-capital';
import { KpiLeverageComponent } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/kpi-leverage/kpi-leverage';
import { KpiNetMarginComponent } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/kpi-net-margin/kpi-net-margin';
import { KpiEbitdaComponent } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/kpi-ebitda/kpi-ebitda';
import { KpiFcfComponent } from '@virteex/bi-ui/lib/pages/dashboard-main/widgets/kpi-fcf/kpi-fcf';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'virteex-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    GridsterModule,
    LucideAngularModule,
    // ✅ CORRECCIÓN: Se añaden todos los widgets a la lista de imports
    KpiCard,
    StatCard,
    ComparisonChart,
    AlertsPanel,
    SalesChart,
    InvoiceStatus,
    LowStockProducts,
    TopProductsChart,
    RecentActivity,
    CashflowChart,
    ExpensesChart,
    ArAgingChart,
    FinancialRatios,
    KpiRoe,
    KpiRoa,
    KpiCurrentRatio,
    KpiQuickRatio,
    KpiWorkingCapital,
    KpiLeverageComponent,
    KpiNetMarginComponent,
    KpiEbitdaComponent,
    KpiFcfComponent,
    TranslateModule
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  private dashboardService = inject(DashboardService);
  protected readonly ResetIcon = LayoutDashboard;
  protected readonly EditIcon = Settings;
  protected readonly PlusIcon = Plus;
  protected readonly CloseIcon = X;
  protected readonly TrashIcon = Trash;


  //  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService); // Inyectar AuthService

  // Exponer el usuario actual a la plantilla
  currentUser = this.authService.currentUser;


  gridOptions!: GridsterConfig;
  dashboard = this.dashboardService.layout;
  isEditMode = signal(false);
  isAddPanelOpen = signal(false);

  availableWidgetsToAdd = computed(() => {
    const allWidgets = this.dashboardService.getAllWidgets();
    const currentWidgetIds = this.dashboard().map(w => w.id);
    // ✅ CORRECCIÓN: Se usa la notación de corchetes para evitar el error de tipos
    return allWidgets.filter(w => !currentWidgetIds.includes(w['id']));
  });

  constructor() {
    effect(() => {
      this.updateGridOptions(this.isEditMode());
    });
  }

  ngOnInit(): void {
    this.updateGridOptions(this.isEditMode());
  }

  toggleEditMode(): void {
    this.isEditMode.update(value => !value);
    if (!this.isEditMode()) {
      this.isAddPanelOpen.set(false);
    }
  }

  addWidget(widgetId: string): void {
    this.dashboardService.addWidget(widgetId);
  }

  removeWidget(widgetId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.dashboardService.removeWidget(widgetId);
  }

  resetDashboardLayout(): void {
    this.dashboardService.resetLayout();
  }

  private updateGridOptions(isEditing: boolean): void {
    this.gridOptions = {
      // gridType: GridType.ScrollVertical,
      gridType: GridType.VerticalFixed,
      compactType: CompactType.None,
      // margin: 16,
      margin: 0,
      outerMargin: true,
      mobileBreakpoint: 768,
      // minCols: 50,
      // maxCols: 50,
      fixedRowHeight: 25,
      draggable: { enabled: isEditing },
      resizable: { enabled: isEditing },
      pushItems: isEditing,
      displayGrid: isEditing ? DisplayGrid.Always : DisplayGrid.None,
      itemChangeCallback: isEditing ? () => this.dashboardService.saveLayout(this.dashboard()) : undefined,
      itemResizeCallback: isEditing ? () => this.dashboardService.saveLayout(this.dashboard()) : undefined,
    };
  }
}