import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  standalone: true,
  selector: 'virtex-ops-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly appName = 'Ops';
}
