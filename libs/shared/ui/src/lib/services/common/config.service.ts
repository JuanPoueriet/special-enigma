import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Industry, CompanySize } from '@virteex/shared-types';
import { APP_CONFIG, AppConfig } from '@virteex/shared-config';

export interface RegistrationOptions {
  industries: Industry[];
  companySizes: CompanySize[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private registrationOptions$: Observable<RegistrationOptions> | null = null;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {}

  getRegistrationOptions(): Observable<RegistrationOptions> {
    if (!this.registrationOptions$) {
      this.registrationOptions$ = this.http.get<RegistrationOptions>(`${this.config.apiUrl}/config/registration-options`).pipe(
        shareReplay(1)
      );
    }
    return this.registrationOptions$;
  }
}
