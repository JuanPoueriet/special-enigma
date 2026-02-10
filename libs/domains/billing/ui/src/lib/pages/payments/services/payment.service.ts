import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  processPayment(amount: number) {
    console.log('Processing payment', amount);
  }
}
