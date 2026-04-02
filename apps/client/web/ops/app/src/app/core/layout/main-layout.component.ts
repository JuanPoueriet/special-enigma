import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'virtex-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent],
  template: `
    <virtex-sidebar></virtex-sidebar>
    <virtex-header></virtex-header>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .content {
      margin-left: 250px;
      margin-top: 64px;
      padding: 24px;
      background-color: #f7fafc;
      min-height: calc(100vh - 64px);
    }
  `]
})
export class MainLayoutComponent {}
