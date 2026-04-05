import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@virtex/shared-ui';

@Component({
  selector: 'virtex-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="sidebar">
      <div class="brand">
        <h1>virtex Ops</h1>
      </div>
      <ul class="menu">
        <li class="menu-header">Core</li>
        <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
        <li *ngIf="hasPermission('tenants:read')"><a routerLink="/tenants" routerLinkActive="active">Tenants</a></li>
        <li *ngIf="hasPermission('invoices:read')"><a routerLink="/billing" routerLinkActive="active">Billing & Plans</a></li>

        <li class="menu-header">Operations</li>
        <li *ngIf="hasPermission('feature-flags:read')"><a routerLink="/feature-flags" routerLinkActive="active">Feature Flags</a></li>
        <li *ngIf="hasPermission('treasury:read')"><a routerLink="/finops" routerLinkActive="active">FinOps</a></li>
        <li *ngIf="hasPermission('monitoring:read')"><a routerLink="/monitoring" routerLinkActive="active">Monitoring</a></li>
        <li *ngIf="hasPermission('support:read')"><a routerLink="/support" routerLinkActive="active">Support</a></li>
        <li *ngIf="hasPermission('security:read')"><a routerLink="/security" routerLinkActive="active">Security</a></li>

        <li class="menu-header">Infrastructure</li>
        <li *ngIf="hasPermission('automation:read')"><a routerLink="/automation" routerLinkActive="active">Automation</a></li>
        <li *ngIf="hasPermission('config:read')"><a routerLink="/config" routerLinkActive="active">Global Config</a></li>
        <li *ngIf="hasPermission('advanced-reports:read')"><a routerLink="/reports" routerLinkActive="active">Reports</a></li>
        <li *ngIf="hasPermission('databases:read')"><a routerLink="/databases" routerLinkActive="active">Databases</a></li>
        <li *ngIf="hasPermission('queues:read')"><a routerLink="/queues" routerLinkActive="active">Queues</a></li>
        <li *ngIf="hasPermission('storage:read')"><a routerLink="/storage" routerLinkActive="active">Storage</a></li>
        <li *ngIf="hasPermission('backups:read')"><a routerLink="/backups" routerLinkActive="active">Backups</a></li>
        <li *ngIf="hasPermission('releases:read')"><a routerLink="/releases" routerLinkActive="active">Releases</a></li>

        <li class="menu-header">Internal</li>
        <li><a routerLink="/docs" routerLinkActive="active">Docs</a></li>
        <li><a routerLink="/notifications" routerLinkActive="active">Notifications</a></li>
        <li><a routerLink="/console-config" routerLinkActive="active">Console Config</a></li>
        <li><a routerLink="/import-export" routerLinkActive="active">Import/Export</a></li>
        <li><a routerLink="/testing" routerLinkActive="active">Testing</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background-color: #1a202c;
      color: #fff;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      overflow-y: auto;
    }
    .brand {
      padding: 20px;
      border-bottom: 1px solid #2d3748;
    }
    .brand h1 {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0;
    }
    .menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .menu li a {
      display: block;
      padding: 12px 20px;
      color: #cbd5e0;
      text-decoration: none;
      transition: background 0.2s;
    }
    .menu li a:hover {
      background-color: #2d3748;
      color: #fff;
    }
    .menu li a.active {
      background-color: #4a5568;
      color: #fff;
      border-left: 4px solid #4299e1;
    }
    .menu-header {
      padding: 15px 20px 5px;
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #718096;
      font-weight: bold;
      letter-spacing: 0.05em;
    }
  `]
})
export class SidebarComponent {
  private readonly authService = inject(AuthService);

  hasPermission(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }
}
