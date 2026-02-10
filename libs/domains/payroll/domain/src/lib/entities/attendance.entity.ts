import { Entity, PrimaryKey, Property, Enum, ManyToOne } from '@mikro-orm/core';
import { AttendanceStatus } from '@virteex/contracts';
import type { Employee } from '@virteex/payroll-domain/src/lib/entities/employee.entity';

@Entity()
export class Attendance {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  tenantId!: string;

  @Property()
  date!: Date;

  @Property({ nullable: true })
  checkIn?: Date;

  @Property({ nullable: true })
  checkOut?: Date;

  @Enum(() => AttendanceStatus)
  status: AttendanceStatus = AttendanceStatus.PRESENT;

  @ManyToOne('Employee')
  employee!: Employee;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(tenantId: string, employee: Employee, date: Date) {
    this.tenantId = tenantId;
    this.employee = employee;
    this.date = date;
  }
}
