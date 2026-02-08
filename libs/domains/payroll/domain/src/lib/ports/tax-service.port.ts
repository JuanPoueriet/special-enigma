export interface TaxService {
  calculateTax(taxableIncome: number): Promise<number>;
}

export const TAX_SERVICE = 'TAX_SERVICE';
