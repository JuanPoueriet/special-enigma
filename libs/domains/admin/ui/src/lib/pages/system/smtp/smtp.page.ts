import { Component } from '@angular/core';


@Component({
  selector: 'app-smtp',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Servidor de Correo</h2>
      <p class="text-gray-600">Configuración SMTP.</p>
    </div>
  `
})
export class SmtpSettingsPage {}
