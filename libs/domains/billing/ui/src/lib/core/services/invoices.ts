import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@virteex/shared-config';

export interface Invoice {
  id: string;
  tenantId: string;
  customerId: string;
  issueDate: string;
  dueDate: string;
  totalAmount: string;
  status: string;
}

export interface PaginatedInvoices {
  items: Invoice[];
  total: number;
}

export interface CreateInvoiceDto {
  customerId: string;
  issueDate: string;
  dueDate: string;
  paymentForm: string;
  paymentMethod: string;
  usage: string;
  notes?: string;
  items: {
      productId: string;
      quantity: number;
      unitPrice: number;
      description: string;
      taxRate: number;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  getInvoices(page = 1, limit = 10): Observable<PaginatedInvoices> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    return this.http.get<PaginatedInvoices>(`${this.apiUrl}/billing/invoices`, { params });
  }

  createInvoice(invoice: CreateInvoiceDto): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/billing/invoices`, invoice);
  }
}
