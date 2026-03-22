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
    if (user.role === 'ADMIN' || user.role === 'SUPERUSER') return true;
    // Basic mapping for now, could be expanded with real permissions from BE
    const rolePermissions: Record<string, string[]> = {
      'OPERATOR': ['tenants:read', 'tenants:create', 'monitoring:read', 'support:read'],
      'VIEWER': ['tenants:read', 'monitoring:read']
    };
    return rolePermissions[user.role]?.includes(permission) ?? false;
  }
}
