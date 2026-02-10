import { Injectable } from '@angular/core';

export interface Subscription {
  id: string;
  plan: string;
  status: 'Active' | 'Inactive';
}

export interface PaymentMethod {
  id: string;
  last4: string;
}

export interface PaymentHistoryItem {
  id: string;
  amount: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  getSubscription() {
    return { id: '1', plan: 'Pro', status: 'Active' };
  }
}
