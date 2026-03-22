import { Entity, PrimaryKey, Property, Enum } from '@mikro-orm/core';

export enum IncidentSeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum IncidentStatus {
  OPEN = 'OPEN',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  RESOLVED = 'RESOLVED',
}

@Entity({ tableName: 'incidents' })
export class Incident {
  @PrimaryKey()
  id!: string;

  @Property()
  title!: string;

  @Enum(() => IncidentSeverity)
  severity: IncidentSeverity = IncidentSeverity.MEDIUM;

  @Enum(() => IncidentStatus)
  status: IncidentStatus = IncidentStatus.OPEN;

  @Property()
  service!: string;

  @Property({ nullable: true })
  tenantId?: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
