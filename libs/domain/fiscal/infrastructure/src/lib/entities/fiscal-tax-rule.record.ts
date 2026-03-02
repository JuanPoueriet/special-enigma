import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { FiscalTaxRule as DomainFiscalTaxRule } from "@virteex/domain-fiscal-domain";

@Entity({ tableName: 'fiscal_tax_rules' })
export class FiscalTaxRuleRecord extends DomainFiscalTaxRule {
  @PrimaryKey({ type: 'uuid' })
  override id!: string;

  @Property()
  override tenantId!: string;

  @Property()
  override name!: string;

  @Property()
  override type!: string;

  @Property()
  override rate!: string;

  @Property({ nullable: true })
  override appliesTo?: string;

  @Property()
  override isActive = true;

  @Property()
  override createdAt: Date = new Date();

  @Property()
  override updatedAt: Date = new Date();
}
