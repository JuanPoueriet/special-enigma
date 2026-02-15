import { Injectable } from '@nestjs/common';

@Injectable()
export class PayrollPeriodCalculator {
  /**
   * Calculates the proportional salary for a given period, considering incidences.
   * Uses standard daily salary (monthly / 30) as per Mexican labor law common practice.
   */
  calculateProportionalSalary(monthlySalary: number, start: Date, end: Date, incidenceDays = 0): number {
    const daysInPeriod = this.calculateDays(start, end);
    const payableDays = daysInPeriod - incidenceDays;

    if (payableDays < 0) return 0;

    const dailySalary = monthlySalary / 30;
    return Number((dailySalary * payableDays).toFixed(2));
  }

  calculateDays(start: Date, end: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    // Round to nearest integer to avoid DST issues
    return Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay)) + 1;
  }
}
