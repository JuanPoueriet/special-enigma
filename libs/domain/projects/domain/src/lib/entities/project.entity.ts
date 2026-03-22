import { ProjectStatus } from '@virteex/domain-projects-contracts';
import type { Task } from './task.entity';

export class Project {
  id!: string;
  tenantId!: string;
  name!: string;
  description?: string;
  status: ProjectStatus = ProjectStatus.PLANNING;
  startDate!: Date;
  endDate?: Date;
  tasks: Task[] = [];

  constructor(tenantId: string, name: string, startDate: Date) {
    this.tenantId = tenantId;
    this.name = name;
    this.startDate = startDate;
  }
}
