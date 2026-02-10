import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'virteex-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'virteex-web';
}
