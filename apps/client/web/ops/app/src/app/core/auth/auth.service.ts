import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthApiClient, AuthUser } from './services/auth-api.client';
import { AuthSessionStore } from './services/auth-session.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly authApiClient = inject(AuthApiClient);
  private readonly authSessionStore = inject(AuthSessionStore);

  readonly currentUser$ = this.authSessionStore.currentUser$;

  login(credentials: { email: string; password?: string }): Observable<AuthUser> {
    return this.authApiClient.login(credentials).pipe(
      tap((user) => {
        this.authSessionStore.set(user);
        this.router.navigate(['/dashboard']);
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }

  logout(): void {
    this.authSessionStore.clear();
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.authSessionStore.isAuthenticated();
  }

  getToken(): string | null {
    return this.authSessionStore.getToken();
  }

  hasPermission(permission: string): boolean {
    const user = this.authSessionStore.getCurrentUser();
    if (!user) return false;

    // Entitlements from backend take precedence for commercial features
    const entitlements: string[] = user.entitlements || [];

    // Support capability:action:scope format
    const [capability, action, scope] = permission.split(':');
    const hasEntitlement = entitlements.some((f) => {
        const parts = f.split(':');
        const fCap = parts[0];
        const fAct = parts[1];
        const fScope = parts[2];
        if (fCap !== capability) return false;
        const actionMatches = !action || fAct === '*' || fAct === action;
        if (!actionMatches) return false;
        const scopeMatches = !scope || fScope === '*' || fScope === scope;
        return scopeMatches;
    });

    if (hasEntitlement) return true;

    // Check if it is a commercial entitlement
    const commercialEntitlements = [
      'invoices', 'users', 'storage', 'branches', 'advanced-reports',
      'treasury', 'payroll', 'fiscal', 'feature-flags', 'plugins',
      'monitoring', 'security', 'support', 'automation', 'config',
      'databases', 'queues', 'backups', 'releases', 'tenants'
    ];

    if (commercialEntitlements.some(ce => permission.startsWith(ce))) {
        // Commercial entitlements MUST be explicitly granted in the entitlements array
        // No role-based bypass allowed here to ensure commercial enforcement
        return false;
    }

    // Role-based check for system/administrative permissions
    if (user.role === 'ADMIN' || user.role === 'SUPERUSER') return true;

    // Fallback to role-based mapping for system permissions
    const rolePermissions: Record<string, string[]> = {
      'OPERATOR': ['tenants:read', 'tenants:create', 'monitoring:read', 'support:read'],
      'VIEWER': ['tenants:read', 'monitoring:read']
    };
    return rolePermissions[user.role]?.includes(permission) ?? false;
  }

  hasPermissions(permissions: string[]): boolean {
    return permissions.every(p => this.hasPermission(p));
  }
}
