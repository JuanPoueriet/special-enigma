export interface Customer {
  id: string;
  tenantId: string;
  type: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  createdAt: string;
}
