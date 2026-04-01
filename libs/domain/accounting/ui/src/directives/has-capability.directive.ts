import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AuthService } from '@virteex/shared-ui';

@Directive({
  selector: '[appHasCapability]',
  standalone: true,
})
export class HasCapabilityDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private authService = inject(AuthService);

  @Input() set appHasCapability(capability: string) {
    if (this.authService.hasPermission(capability)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
