import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { v4 } from 'uuid';
import type { Warehouse } from './warehouse.entity';

@Entity()
@Unique({ properties: ['warehouse', 'code'] })
export class Location {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  tenantId!: string;

  @ManyToOne('Warehouse')
  warehouse!: Warehouse;

  @Property()
  code!: string;

  @Property()
  type!: string; // e.g., 'RACK', 'BIN', 'FLOOR'

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(tenantId: string, warehouse: Warehouse, code: string, type: string) {
    this.tenantId = tenantId;
    this.warehouse = warehouse;
    this.code = code;
    this.type = type;
  }
}
