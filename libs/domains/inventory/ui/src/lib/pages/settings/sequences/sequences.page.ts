import { Component } from '@angular/core';


@Component({
  selector: 'app-sequences',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Secuencias Fiscales</h2>
      <p class="text-gray-600">Configuración de numeración de documentos.</p>
    </div>
  `
})
export class SequenceSettingsPage {}
