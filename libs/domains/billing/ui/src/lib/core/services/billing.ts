import { Injectable, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@virteex/shared-ui';

export interface Subscription {
  id: string;
  planId: string;
  planName?: string; // Backend doesn't return planName yet, frontend might need to map it
  status: 'Active' | 'Inactive' | 'Trial';
  price: number;
  billingCycle: string;
  nextBillingDate: string;
  trialEndsDate?: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryDate: string;
  isDefault?: boolean;
}

export interface PaymentHistoryItem {
  id: string;
  amount: number;
  date: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private http = inject(HttpClient);

  plans = [
    { id: '1', slug: 'free', name: 'Free', price: 0, description: 'Basic features' },
    { id: '2', slug: 'pro', name: 'Pro', price: 29.99, description: 'Advanced features' },
    { id: '3', slug: 'enterprise', name: 'Enterprise', price: 99.99, description: 'All features' }
  ];

  constructor(@Inject(API_URL) private apiUrl: string) {}

  getSubscription(tenantId: string = 'default'): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/billing/subscription?tenantId=${tenantId}`);
  }

  getPaymentMethod(tenantId: string = 'default'): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.apiUrl}/billing/payment-methods?tenantId=${tenantId}`);
  }

  // Keeping this mock for now as backend for history wasn't strictly requested in plan, but I can add it if time permits.
  // The plan focused on Subscription and PaymentMethod.
  getPaymentHistory(tenantId: string = 'default'): Observable<PaymentHistoryItem[]> {
      // TODO: Implement backend for payment history
      return this.http.get<PaymentHistoryItem[]>(`${this.apiUrl}/billing/invoices?tenantId=${tenantId}`);
  }

  getUsage() {
      return [{ resource: 'Invoices', used: 10, limit: 100, type: 'numeric', isUnlimited: false, isEnabled: true }];
  }

  changePlan(planId: string, tenantId: string = 'default') {
      // Ideally this should call an endpoint to update subscription
      return this.http.post(`${this.apiUrl}/billing/subscription`, { planId, tenantId });
  }

  addPaymentMethod(paymentMethod: any, tenantId: string = 'default') {
      return this.http.post(`${this.apiUrl}/billing/payment-methods`, { ...paymentMethod, tenantId });
  }
}
