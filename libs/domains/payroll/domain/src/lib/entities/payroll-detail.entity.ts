import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { PayrollDetailType } from '@virteex/contracts';
import type { Payroll } from '@virteex/payroll-domain/src/lib/entities/payroll.entity';

@Entity()
export class PayrollDetail {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  tenantId!: string;

  @Property()
  concept!: string;

  @Property({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Enum(() => PayrollDetailType)
  type!: PayrollDetailType;

  @ManyToOne('Payroll')
  payroll!: Payroll;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  constructor(tenantId: string, concept: string, amount: number, type: PayrollDetailType) {
    this.tenantId = tenantId;
    this.concept = concept;
    this.amount = amount;
    this.type = type;
  }
}
