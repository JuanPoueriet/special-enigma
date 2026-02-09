// ../app/core/api/localization.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@virteex/shared-ui/lib/core/environments/environment';
import { FiscalRegion } from '@virteex/shared-ui/lib/core/models/fiscal-region.model';
import { environment } from '@virteex/shared-ui/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalizationApiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/localization`;

  getFiscalRegions(): Observable<FiscalRegion[]> {
    return this.http.get<FiscalRegion[]>(`${this.apiUrl}/fiscal-regions`);
  }
}
