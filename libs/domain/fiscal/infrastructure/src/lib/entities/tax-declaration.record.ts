import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { TaxDeclaration as DomainTaxDeclaration } from "@virteex/domain-fiscal-domain";

@Entity({ tableName: 'tax_declarations' })
export class TaxDeclarationRecord extends DomainTaxDeclaration {
  @PrimaryKey({ type: 'uuid' })
  override id!: string;

  @Property()
  override tenantId!: string;

  @Property()
  override period!: string;

  @Property()
  override amount!: string;

  @Property()
  override status!: string;
}
