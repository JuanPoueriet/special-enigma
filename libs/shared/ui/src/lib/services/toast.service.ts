import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private renderer: Renderer2;
  private container: HTMLElement | null = null;

  private icons: Record<ToastType, string> = {
    success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
  };

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private translate: TranslateService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  showError(message: string, title?: string) {
    this.show(message, 'error', title);
  }

  showSuccess(message: string, title?: string) {
    this.show(message, 'success', title);
  }

  showWarning(message: string, title?: string) {
    this.show(message, 'warning', title);
  }

  showInfo(message: string, title?: string) {
    this.show(message, 'info', title);
  }

  private ensureContainer() {
    if (!this.container) {
      this.container = this.renderer.createElement('div');
      this.renderer.addClass(this.container, 'toast-container');
      this.renderer.appendChild(this.document.body, this.container);
    }
  }

  private show(message: string, type: ToastType, title?: string) {
    this.ensureContainer();

    const toast = this.renderer.createElement('div');
    this.renderer.addClass(toast, 'toast');
    this.renderer.addClass(toast, `toast-${type}`);

    // Icon
    const iconContainer = this.renderer.createElement('div');
    this.renderer.addClass(iconContainer, 'toast-icon');
    iconContainer.innerHTML = this.icons[type];
    this.renderer.appendChild(toast, iconContainer);

    // Content
    const content = this.renderer.createElement('div');
    this.renderer.addClass(content, 'toast-content');

    // Title
    const finalTitle = title || `TOAST.${type.toUpperCase()}`;
    const titleElem = this.renderer.createElement('div');
    this.renderer.addClass(titleElem, 'toast-title');
    this.translate.get(finalTitle).subscribe(translatedTitle => {
        this.renderer.setProperty(titleElem, 'innerText', translatedTitle);
    });
    this.renderer.appendChild(content, titleElem);

    // Message
    const messageElem = this.renderer.createElement('div');
    this.renderer.addClass(messageElem, 'toast-message');
    this.translate.get(message).subscribe(translatedMsg => {
        this.renderer.setProperty(messageElem, 'innerText', translatedMsg);
    });
    this.renderer.appendChild(content, messageElem);

    this.renderer.appendChild(toast, content);

    if (this.container) {
      this.renderer.appendChild(this.container, toast);
      // Trigger reflow to enable transition
      setTimeout(() => {
        this.renderer.addClass(toast, 'visible');
      }, 10);
    }

    setTimeout(() => {
        this.renderer.removeClass(toast, 'visible');
        setTimeout(() => {
             if (this.container && toast.parentNode === this.container) {
                this.renderer.removeChild(this.container, toast);
             }
        }, 300); // Wait for fade out
    }, 5000); // Increased duration to 5s for better readability
  }
}
