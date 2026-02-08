import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { Company } from './company.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = uuidv4();

  @Property()
  @Unique()
  email!: string;

  @Property()
  passwordHash!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  country!: string;

  @Property()
  timezone!: string;

  @Property()
  role: string = 'user'; // 'admin', 'user', etc.

  @ManyToOne(() => Company)
  company!: Company;

  @Property()
  isActive: boolean = true;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(email: string, passwordHash: string, firstName: string, lastName: string, country: string, company: Company) {
    this.email = email;
    this.passwordHash = passwordHash;
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
    this.company = company;
    // Default timezone based on country could be logic here, but keeping it simple
    this.timezone = 'UTC';
  }
}
