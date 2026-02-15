import { Injectable, signal, inject, computed, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { API_URL } from '@virteex/shared-ui';
import { firstValueFrom } from 'rxjs';

export interface User {
  id: string;
  email: string;
  role: string;
  companyId: string;
  country?: string;
  sessionId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private tokenService = inject(TokenService);
  private http = inject(HttpClient);

  private _user = signal<User | null>(null);
  public user = this._user.asReadonly();
  public isLoggedIn = computed(() => !!this._user());

  constructor(@Inject(API_URL) private apiUrl: string) {
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

  private async restoreSession(): Promise<void> {
    const token = this.tokenService.getAccessToken();
    if (token) {
      // Optimistic restore to pass AuthGuard immediately
      try {
        const user = this.decodeToken(token);
        this._user.set(user);
      } catch (e) {
        console.error('Invalid token format', e);
        this.logout();
        return;
      }

      try {
        // Validate with backend
        await firstValueFrom(this.http.get(`${this.apiUrl}/auth/validate`));
      } catch (e) {
        console.error('Invalid token or session expired', e);
        this.logout();
      }
    }
  }

  private decodeToken(token: string): User {
    const payload = token.split('.')[1];
    if (!payload) throw new Error('Invalid token format');

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    const decoded = JSON.parse(jsonPayload);

    return {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
      companyId: decoded.companyId,
      country: decoded.country,
      sessionId: decoded.sessionId,
    };
  }
}
