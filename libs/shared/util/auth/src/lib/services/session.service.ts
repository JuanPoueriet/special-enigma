import { Injectable, signal, inject, computed } from '@angular/core';
import { TokenService } from './token.service';

export interface User {
  id: string;
  email: string;
  role: string;
  companyId: string;
  country?: string;
  sessionId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private tokenService = inject(TokenService);

  private _user = signal<User | null>(null);
  public user = this._user.asReadonly();
  public isLoggedIn = computed(() => !!this._user());

  constructor() {
    this.restoreSession();
  }

  login(accessToken: string, refreshToken?: string): void {
    this.tokenService.setTokens(accessToken, refreshToken);
    this.restoreSession();
  }

  logout(): void {
    this.tokenService.clearTokens();
    this._user.set(null);
    // Ideally redirect to login here or let the caller handle it
  }

  private restoreSession(): void {
    const token = this.tokenService.getAccessToken();
    if (token) {
      try {
        const user = this.decodeToken(token);
        // Check expiry?
        this._user.set(user);
      } catch (e) {
        console.error('Invalid token', e);
        this.logout();
      }
    }
  }

  private decodeToken(token: string): User {
    const payload = token.split('.')[1];
    if (!payload) throw new Error('Invalid token format');

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const decoded = JSON.parse(jsonPayload);

    return {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
      companyId: decoded.companyId,
      country: decoded.country,
      sessionId: decoded.sessionId
    };
  }
}
