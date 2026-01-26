import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class SampleEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  tenantId!: string;

  @Property()
  name!: string;
}
