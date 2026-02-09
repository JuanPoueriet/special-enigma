import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { LucideAngularModule, TrendingUp, TrendingDown } from 'lucide-angular';
import { Kpi } from '../../../core/models/finance';

@Component({
  selector: 'virteex-kpi-card',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './kpi-card.html',
  styleUrls: ['./kpi-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiCard {
  @Input() data: Kpi | undefined;

  protected readonly TrendingUpIcon = TrendingUp;
  protected readonly TrendingDownIcon = TrendingDown;
}