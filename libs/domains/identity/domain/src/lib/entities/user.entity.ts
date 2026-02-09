import { Entity, PrimaryKey, Property, ManyToOne, Unique } from '@mikro-orm/core';
import { Company } from '@virteex/identity-domain/lib/entities/company.entity';
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
  role = 'user'; // 'admin', 'user', etc.

  @ManyToOne(() => Company)
  company!: Company;

  @Property()
  isActive = true;

  // New fields for Authentication Security
  @Property()
  riskScore = 0; // 0-100, dynamic or static baseline

  @Property()
  mfaEnabled = false;

  @Property({ nullable: true })
  mfaSecret?: string;

  @Property({ nullable: true })
  lastLoginAt?: Date;

  @Property()
  failedLoginAttempts = 0;

  @Property({ nullable: true })
  lockedUntil?: Date;

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
    this.timezone = 'UTC';
  }
}
