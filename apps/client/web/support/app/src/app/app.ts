import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'virtex-support-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly appName = 'Support';
}
