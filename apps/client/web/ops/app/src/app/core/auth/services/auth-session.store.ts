import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthUser } from './auth-api.client';

@Injectable({ providedIn: 'root' })
export class AuthSessionStore {
  private readonly currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.rehydrate();
  }

  private rehydrate(): void {
    const email = localStorage.getItem('email');

    // With HttpOnly cookies, we rely on the backend to tell us who we are.
    // The interceptor will handle authentication via cookies.
    // We can still keep the email for UI display if it was saved.
    if (email) {
      this.currentUserSubject.next({
          id: 0,
          email: email,
          role: 'INITIALIZING', // Better state than GUEST
          accessToken: '', // No longer stored in client
          entitlements: []
      });
    }
  }

  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  set(user: AuthUser): void {
    // Level 6: Do NOT store the token in client-accessible storage
    // We only keep user info for the UI
    localStorage.setItem('email', user.email);

    this.currentUserSubject.next(user);
  }

  clear(): void {
    localStorage.removeItem('email');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): AuthUser | null {
    const user = this.currentUserSubject.value;
    if (user && !this.isTokenValid(user.token)) {
        this.clear();
        return null;
    }
    return user;
  }

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return !!user;
  }

  getToken(): string | null {
    const user = this.getCurrentUser();
    return user ? user.accessToken : null;
  }
}
