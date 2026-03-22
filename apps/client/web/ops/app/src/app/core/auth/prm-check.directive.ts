import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[prmCheck]',
  standalone: true
})
export class PrmCheckDirective implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private subscription?: Subscription;

  private permission?: string;
  private isVisible = false;

  @Input()
  set prmCheck(val: string) {
    this.permission = val;
    this.updateView();
  }

  ngOnInit() {
    this.subscription = this.authService.currentUser$.subscribe(() => {
      this.updateView();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private updateView() {
    if (!this.permission) return;

    const hasPermission = this.authService.hasPermission(this.permission);

    if (hasPermission && !this.isVisible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.isVisible = true;
    } else if (!hasPermission && this.isVisible) {
      this.viewContainer.clear();
      this.isVisible = false;
    }
  }
}
