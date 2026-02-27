import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // API Gateway
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<{ token: string; email?: string } | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check localStorage on init
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email') || undefined;
    if (token) {
        // Ideally verify token validity here
        this.currentUserSubject.next({ token, email });
    }
  }

  login(credentials: { email: string; password?: string }): Observable<{ id: number; email: string; role: string; token: string }> {
    // REAL IMPLEMENTATION: Hitting the backend authentication endpoint
    return this.http.post<{ id: number; email: string; role: string; token: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(user => {
        if (user && user.token) {
            localStorage.setItem('token', user.token);
            if (user.email) localStorage.setItem('email', user.email);
            this.currentUserSubject.next(user);
            this.router.navigate(['/dashboard']);
        }
      }),
      catchError(error => {
          console.error('Login failed', error);
          return throwError(() => new Error('Login failed. Please check your credentials.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    // Basic check. In production, check token expiration jwt-decode
    return !!this.currentUserSubject.value || !!localStorage.getItem('token');
  }

  getToken(): string | null {
      return localStorage.getItem('token');
  }
}
