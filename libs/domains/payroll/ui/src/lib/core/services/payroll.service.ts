import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GraphQLClientService } from '@virteex/shared-util-http';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  salary: number;
  status: string;
}

export interface CalculatePayrollInput {
  employeeId: string;
  periodStart: string;
  periodEnd: string;
}

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private gql = inject(GraphQLClientService);

  getEmployees(): Observable<Employee[]> {
    const query = `
      query GetEmployees {
        employees {
          id
          firstName
          lastName
          email
          position
          salary
          status
        }
      }
    `;
    return this.gql.query<{ employees: Employee[] }>(query).pipe(
      map(res => res.employees)
    );
  }

  calculatePayroll(input: CalculatePayrollInput): Observable<boolean> {
    const mutation = `
      mutation CalculatePayroll($input: CalculatePayrollInput!) {
        calculatePayroll(input: $input)
      }
    `;
    return this.gql.mutate<{ calculatePayroll: boolean }>(mutation, { input }).pipe(
      map(res => res.calculatePayroll)
    );
  }
}
