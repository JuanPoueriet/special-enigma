
import { BankAccount } from './bank-account.entity';

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}


export class Transaction {

  id!: string;


    tenantId!: string;

    date!: Date;


    amount!: number;


  type!: TransactionType;


    description!: string;

    reference?: string;


  bankAccount!: BankAccount;


    createdAt: Date = new Date();

  constructor(tenantId: string, bankAccount: BankAccount, amount: number, type: TransactionType, description: string) {
    this.tenantId = tenantId;
    this.bankAccount = bankAccount;
    this.amount = amount;
    this.type = type;
    this.description = description;
    this.date = new Date();
  }
}
