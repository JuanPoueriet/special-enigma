import { Injectable, Inject } from '@nestjs/common';
import { Employee, EmployeeRepository, EMPLOYEE_REPOSITORY } from '../../../../domain/src/index';

@Injectable()
export class GetEmployeesUseCase {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY) private readonly repository: EmployeeRepository
  ) {}

  async execute(tenantId: string): Promise<Employee[]> {
    return this.repository.findAllByTenant(tenantId);
  }
}
