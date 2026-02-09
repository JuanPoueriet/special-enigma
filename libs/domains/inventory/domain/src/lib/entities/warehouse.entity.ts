import { Entity, PrimaryKey, Property, OneToMany, Collection, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { Location } from './location.entity';

@Entity()
@Unique({ properties: ['tenantId', 'code'] })
export class Warehouse {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  tenantId!: string;

  @Property()
  code!: string;

  @Property()
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  isActive = true;

  @OneToMany('Location', 'warehouse')
  locations = new Collection<Location>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(tenantId: string, code: string, name: string) {
    this.tenantId = tenantId;
    this.code = code;
    this.name = name;
  }
}
