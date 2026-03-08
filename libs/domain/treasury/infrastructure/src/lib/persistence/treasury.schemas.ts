import { EntitySchema } from '@mikro-orm/core';
import { BankAccount, CashFlow, Transaction } from '../../../../domain/src';

export const bankAccountSchema = new EntitySchema<BankAccount>({
  class: BankAccount,
  properties: {
    id: { type: 'string', primary: true },
    tenantId: { type: 'string' },
    name: { type: 'string' },
    accountNumber: { type: 'string' },
    bankName: { type: 'string' },
    balance: { type: 'number' },
    currency: { type: 'string' },
    transactions: { kind: '1:m', entity: () => 'CashFlow', mappedBy: 'bankAccount' },
    createdAt: { type: 'Date' },
    updatedAt: { type: 'Date' },
  },
});

export const cashFlowSchema = new EntitySchema<CashFlow>({
  class: CashFlow,
  properties: {
    id: { type: 'string', primary: true },
    tenantId: { type: 'string' },
    amount: { type: 'number' },
    date: { type: 'Date' },
    type: { type: 'string' },
    description: { type: 'string' },
    reference: { type: 'string', nullable: true },
    bankAccount: { kind: 'm:1', entity: () => 'BankAccount' },
    createdAt: { type: 'Date' },
  },
});

export const transactionSchema = new EntitySchema<Transaction>({
  class: Transaction,
  properties: {
    id: { type: 'string', primary: true },
    tenantId: { type: 'string' },
    amount: { type: 'number' },
    date: { type: 'Date' },
    type: { type: 'string' },
    description: { type: 'string' },
    reference: { type: 'string', nullable: true },
    bankAccount: { kind: 'm:1', entity: () => 'BankAccount' },
    createdAt: { type: 'Date' },
  },
});
