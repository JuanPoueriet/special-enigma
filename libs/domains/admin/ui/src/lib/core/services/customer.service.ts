import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@virteex/shared-config';

export interface Customer {
  id?: string;
  tenantId?: string;
  companyName: string;
  taxId: string;
  email: string;
  phone: string;
  contactPerson?: string;
  address?: string;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  country?: string;
  type?: 'COMPANY' | 'INDIVIDUAL';
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);
  private apiUrl = `${this.config.apiUrl}/crm/customers`;

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  findAll(tenantId?: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl, { params: tenantId ? { tenantId } : {} });
  }

  getById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  update(id: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer);
  }
}
