import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SyncService } from './core/services/sync.service';

@Component({
  imports: [RouterModule],
  selector: 'virtex-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'virtex-mobile';
  private syncService = inject(SyncService);
}
