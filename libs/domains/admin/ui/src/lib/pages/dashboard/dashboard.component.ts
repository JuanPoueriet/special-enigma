import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'virteex-admin-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
