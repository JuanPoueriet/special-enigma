export interface Ledger {
  id: string;
  name: string;
  code: string;
  status: 'Active' | 'Closed';
}
