import { Entity, PrimaryKey, Property, Collection } from '@mikro-orm/core';

@Entity()
export class Task {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;
}

@Entity()
export class Project {
  @PrimaryKey()
  id!: string;

  @Property()
  tenantId!: string;

  @Property()
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  status: string = 'ACTIVE';

  @Property()
  startDate!: Date;

  @Property({ nullable: true })
  endDate?: Date;

  @Property({ type: 'Collection' })
  tasks = new Collection<Task>(this);

  constructor(tenantId: string, name: string, startDate: Date) {
    this.tenantId = tenantId;
    this.name = name;
    this.startDate = startDate;
  }
}
