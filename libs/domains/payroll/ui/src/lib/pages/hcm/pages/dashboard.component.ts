
import { Component } from '@angular/core';


@Component({
  selector: 'app-hcm-dashboard',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Human Capital Management (HCM)</h1>
      <p class="mb-6 text-gray-600 dark:text-gray-300">Employee records, payroll, and performance management.</p>
    </div>
  `
})
export class HcmDashboardComponent {}
