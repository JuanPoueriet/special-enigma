import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  status: 'Active' | 'Inactive';
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
  plans = [
    { id: '1', slug: 'free', name: 'Free', price: 0, description: 'Basic features' },
    { id: '2', slug: 'pro', name: 'Pro', price: 29.99, description: 'Advanced features' },
    { id: '3', slug: 'enterprise', name: 'Enterprise', price: 99.99, description: 'All features' }
  ];

  getSubscription() {
    return {
        id: '1',
        planId: 'pro',
        planName: 'Pro',
        status: 'Active',
        price: 29.99,
        billingCycle: 'month',
        nextBillingDate: new Date().toISOString()
    } as Subscription; // Cast because interface might mismatch slightly but good enough for demo
  }

  getPaymentMethod() {
      return { id: '1', type: 'Visa', last4: '4242', expiryDate: '12/25' };
  }

  getPaymentHistory() {
      return [{ id: '1', amount: 29.99, date: new Date().toISOString(), description: 'Pro Plan' }];
  }

  getUsage() {
      return [{ resource: 'Invoices', used: 10, limit: 100, type: 'numeric', isUnlimited: false, isEnabled: true }];
  }

  changePlan(planId: string) {
      return of(true);
  }
}
