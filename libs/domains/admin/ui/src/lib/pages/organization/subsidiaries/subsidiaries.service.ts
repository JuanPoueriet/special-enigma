import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@virteex/shared-config';

export interface Subsidiary {
  parentOrganizationId: string;
  subsidiaryOrganizationId: string;
  ownership: number;
  subsidiary: {
    id: string;
    legalName: string;
    taxId: string;
    country: string;
  };
}

export interface CreateSubsidiaryDto {
  legalName: string;
  taxId: string;
  country: string;
  ownership: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubsidiariesService {
  private config = inject(APP_CONFIG);
  private apiUrl = `${this.config.apiUrl}/organizations/subsidiaries`;

  constructor(private http: HttpClient) {}

  getSubsidiaries(): Observable<Subsidiary[]> {
    return this.http.get<Subsidiary[]>(this.apiUrl);
  }

  createSubsidiary(data: CreateSubsidiaryDto): Observable<Subsidiary> {
    return this.http.post<Subsidiary>(this.apiUrl, data);
  }
}
