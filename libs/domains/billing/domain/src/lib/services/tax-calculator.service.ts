export class TaxCalculatorService {
  calculateTax(amount: number, jurisdiction: string): number {
    // Dummy implementation
    if (jurisdiction === 'MX') {
      return amount * 0.16; // IVA 16%
    } else if (jurisdiction === 'BR') {
      return amount * 0.20; // ICMS dummy
    }
    return 0;
  }
}
