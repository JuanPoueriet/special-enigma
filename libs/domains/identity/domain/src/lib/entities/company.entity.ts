import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Company {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  name!: string;

  @Property()
  taxId!: string; // NIT, RFC, etc.

  @Property()
  country!: string;

  @Property({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @OneToMany(() => User, user => user.company)
  users = new Collection<User>(this);

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(name: string, taxId: string, country: string) {
    this.name = name;
    this.taxId = taxId;
    this.country = country;
  }
}
