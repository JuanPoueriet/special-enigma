import { Component } from '@angular/core';


@Component({
  selector: 'app-security',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Seguridad y Auditoría</h2>
      <p class="text-gray-600">Políticas de seguridad y logs.</p>
    </div>
  `
})
export class SecuritySettingsPage {}
