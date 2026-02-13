import { AccountType } from '@virteex/accounting-contracts';

export interface Account {
  id: string;
  tenantId: string;
  code: string;
  name: string;
  type: AccountType;
  parentId?: string;
  level: number;
  isControl: boolean;
  currency?: string;
}
