import { AccountType } from '../../../shared/enums/account-type.enum';

export interface AccountResponseV2 {
  id: string;
  tenantId: string;
  code: string;
  name: string;
  type: AccountType;
  level: number;
  isControl: boolean;
  currency?: string;
  parentId?: string;
  currentBalance: {
    amount: string;
    currency: string;
  };
  metadata?: Record<string, any>;
  version: number;
  createdAt: string;
  updatedAt: string;
}
