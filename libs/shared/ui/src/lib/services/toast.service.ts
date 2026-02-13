import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private renderer: Renderer2;
  private container: HTMLElement | null = null;

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

  private ensureContainer() {
    if (!this.container) {
      this.container = this.renderer.createElement('div');
      this.renderer.setStyle(this.container, 'position', 'fixed');
      this.renderer.setStyle(this.container, 'bottom', '20px');
      this.renderer.setStyle(this.container, 'right', '20px');
      this.renderer.setStyle(this.container, 'z-index', '9999');
      this.renderer.setStyle(this.container, 'display', 'flex');
      this.renderer.setStyle(this.container, 'flex-direction', 'column');
      this.renderer.setStyle(this.container, 'gap', '10px');
      this.renderer.setStyle(this.container, 'pointer-events', 'none'); // Let clicks pass through container
      this.renderer.appendChild(this.document.body, this.container);
    }
  }

  private show(message: string, type: 'error' | 'success') {
    this.ensureContainer();
    const toast = this.renderer.createElement('div');
    const text = this.renderer.createText(message);

    this.renderer.appendChild(toast, text);
    this.renderer.setStyle(toast, 'padding', '12px 24px');
    this.renderer.setStyle(toast, 'border-radius', '4px');
    this.renderer.setStyle(toast, 'color', 'white');
    this.renderer.setStyle(toast, 'font-family', 'sans-serif');
    this.renderer.setStyle(toast, 'box-shadow', '0 4px 6px rgba(0,0,0,0.1)');
    this.renderer.setStyle(toast, 'min-width', '250px');
    this.renderer.setStyle(toast, 'pointer-events', 'auto'); // Re-enable clicks on toasts
    this.renderer.setStyle(toast, 'opacity', '0');
    this.renderer.setStyle(toast, 'transition', 'opacity 0.3s ease-in-out');

    if (type === 'error') {
        this.renderer.setStyle(toast, 'background-color', '#dc2626'); // Red-600
    } else {
        this.renderer.setStyle(toast, 'background-color', '#16a34a'); // Green-600
    }

    if (this.container) {
      this.renderer.appendChild(this.container, toast);
      // Trigger reflow to enable transition
      setTimeout(() => {
        this.renderer.setStyle(toast, 'opacity', '1');
      }, 10);
    }

    setTimeout(() => {
        this.renderer.setStyle(toast, 'opacity', '0');
        setTimeout(() => {
             if (this.container) {
                this.renderer.removeChild(this.container, toast);
             }
        }, 300); // Wait for fade out
    }, 3000);
  }
}
