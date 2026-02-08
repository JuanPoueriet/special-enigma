import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from '@virteex-erp/identity-application';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(dto: LoginUserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, dto);
  }

  register(dto: RegisterUserDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, dto);
  }
}
