import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@virteex/shared-config';

export interface Subscription {
  id: string;
  planId: string;
  planName?: string;
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

export interface CreatePaymentMethodPayload {
  type: string;
  token: string;
  last4?: string;
  expiryDate?: string;
  isDefault?: boolean;
  [key: string]: unknown;
}

export interface PaymentHistoryItem {
  id: string;
  amount: number;
  date: string;
  description: string;
  status: string;
}

export interface SubscriptionPlan {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  features?: string;
}

export interface UsageItem {
  resource: string;
  used: number;
  limit: number;
  type: string;
  isUnlimited: boolean;
  isEnabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  getPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlan[]>(`${this.apiUrl}/billing/plans`);
  }

  getSubscription(tenantId = 'default'): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/billing/subscription?tenantId=${tenantId}`);
  }

  getPaymentMethod(tenantId = 'default'): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.apiUrl}/billing/payment-methods?tenantId=${tenantId}`);
  }

  getPaymentHistory(tenantId = 'default'): Observable<PaymentHistoryItem[]> {
      return this.http.get<PaymentHistoryItem[]>(`${this.apiUrl}/billing/history?tenantId=${tenantId}`);
  }

  getUsage(tenantId = 'default'): Observable<UsageItem[]> {
      return this.http.get<UsageItem[]>(`${this.apiUrl}/billing/usage?tenantId=${tenantId}`);
  }

  changePlan(planId: string, tenantId = 'default') {
      return this.http.post(`${this.apiUrl}/billing/subscription`, { planId, tenantId });
  }

  addPaymentMethod(paymentMethod: CreatePaymentMethodPayload, tenantId = 'default') {
      return this.http.post(`${this.apiUrl}/billing/payment-methods`, { ...paymentMethod, tenantId });
  }

  createCheckoutSession(priceId: string, customerId: string) {
      return this.http.post<{ url: string }>(`${this.apiUrl}/billing/checkout`, { priceId, customerId });
  }

  createPortalSession(customerId: string) {
      return this.http.post<{ url: string }>(`${this.apiUrl}/billing/portal`, { customerId });
  }
}
