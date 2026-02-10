import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  showError(message: string) {
    this.show(message, 'error');
  }

  showSuccess(message: string) {
    this.show(message, 'success');
  }

  private show(message: string, type: 'error' | 'success') {
    const toast = this.renderer.createElement('div');
    const text = this.renderer.createText(message);

    this.renderer.appendChild(toast, text);
    this.renderer.setStyle(toast, 'position', 'fixed');
    this.renderer.setStyle(toast, 'bottom', '20px');
    this.renderer.setStyle(toast, 'right', '20px');
    this.renderer.setStyle(toast, 'padding', '10px 20px');
    this.renderer.setStyle(toast, 'border-radius', '4px');
    this.renderer.setStyle(toast, 'color', 'white');
    this.renderer.setStyle(toast, 'z-index', '9999');
    this.renderer.setStyle(toast, 'font-family', 'sans-serif');
    this.renderer.setStyle(toast, 'box-shadow', '0 2px 5px rgba(0,0,0,0.2)');

    if (type === 'error') {
        this.renderer.setStyle(toast, 'background-color', '#f44336');
    } else {
        this.renderer.setStyle(toast, 'background-color', '#4CAF50');
    }

    this.renderer.appendChild(this.document.body, toast);

    setTimeout(() => {
        this.renderer.removeChild(this.document.body, toast);
    }, 3000);
  }
}
