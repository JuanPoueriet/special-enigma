import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { API_URL } from '@virteex/shared-ui';

export interface Invoice {
  id: string;
  number: string;
  customerName: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Void';
}

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/billing/invoices`);
  }

  createInvoice(invoice: Omit<Invoice, 'id'>): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/billing/invoices`, invoice);
  }
}
