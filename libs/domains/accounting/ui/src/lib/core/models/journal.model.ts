export interface Journal {
  id: string;
  name: string;
  code: string;
  type: 'General' | 'Sales' | 'Purchase';
}
