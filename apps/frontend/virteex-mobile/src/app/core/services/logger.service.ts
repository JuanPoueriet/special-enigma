import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly isProduction = environment.production;

  log(message: string, ...args: any[]) {
    if (!this.isProduction) {
      console.log(message, ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (!this.isProduction) {
      console.warn(message, ...args);
    }
  }

  error(message: string, ...args: any[]) {
    if (!this.isProduction) {
      console.error(message, ...args);
    }
  }
}
