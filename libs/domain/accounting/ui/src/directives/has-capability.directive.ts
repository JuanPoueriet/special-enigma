import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

/**
 * Mocking a capability service for demonstration.
 * In a real app, this would be injected from an Auth/Session module.
 */
class CapabilityService {
    // Mock user capabilities - normally fetched from backend or JWT
    private capabilities = new Set<string>([
        'accounting:account:read',
        'accounting:journal-entry:read',
        'accounting:report:generate',
        'accounting:period:read'
        // 'accounting:report:export' // Mocking missing capability
    ]);

    hasCapability(capability: string): boolean {
        return this.capabilities.has(capability);
    }
}

@Directive({
  selector: '[appHasCapability]',
  standalone: true,
})
export class HasCapabilityDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private capabilityService = new CapabilityService(); // Would normally be injected

  @Input() set appHasCapability(capability: string) {
    if (this.capabilityService.hasCapability(capability)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
