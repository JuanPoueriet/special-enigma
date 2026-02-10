import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { CashFlowType } from '@virteex/contracts';
import type { BankAccount } from '@virteex/treasury-domain/lib/entities/bank-account.entity';

@Entity()
export class CashFlow {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  tenantId!: string;

  @Property()
  date!: Date;

  @Property({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Enum(() => CashFlowType)
  type!: CashFlowType;

  @Property()
  description!: string;

  @Property({ nullable: true })
  reference?: string;

  @ManyToOne('BankAccount')
  bankAccount!: BankAccount;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  constructor(tenantId: string, bankAccount: BankAccount, amount: number, type: CashFlowType, description: string) {
    this.tenantId = tenantId;
    this.bankAccount = bankAccount;
    this.amount = amount;
    this.type = type;
    this.description = description;
    this.date = new Date();
  }
}
