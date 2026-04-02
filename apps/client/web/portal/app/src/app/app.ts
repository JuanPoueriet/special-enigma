import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@virtex/shared-ui';

@Component({
  imports: [RouterModule],
  selector: 'virtex-web-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly appName = 'Web';
  private readonly themeService = inject(ThemeService);
}
