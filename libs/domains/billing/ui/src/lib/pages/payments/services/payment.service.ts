import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@virteex/shared-config';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  processPayment(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/billing/payments`, { amount });
  }
}
