import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Attendance } from '../../../../domain/src/lib/entities/attendance.entity';
import { AttendanceRepository } from '../../../../domain/src/lib/repositories/attendance.repository';
import { AttendanceStatus } from '@virteex/contracts';

@Injectable()
export class MikroOrmAttendanceRepository implements AttendanceRepository {
  constructor(private readonly em: EntityManager) {}

  async findByEmployeeAndPeriod(employeeId: string, start: Date, end: Date): Promise<Attendance[]> {
    return this.em.find(Attendance, {
      employee: employeeId,
      date: { $gte: start, $lte: end }
    });
  }

  async save(attendance: Attendance): Promise<void> {
    await this.em.persistAndFlush(attendance);
  }

  async countIncidences(employeeId: string, start: Date, end: Date): Promise<number> {
    const absences = await this.em.count(Attendance, {
      employee: employeeId,
      date: { $gte: start, $lte: end },
      status: AttendanceStatus.ABSENT // Assuming ABSENT is the enum value
    });
    return absences;
  }
}
