import { Injectable, Inject } from '@nestjs/common';
import { type ExpensesPort, EXPENSES_PORT, type ExpenseCategory } from '@virtex/domain-bi-domain';
import { GetExpensesQuery } from './get-expenses.query';

@Injectable()
export class GetExpensesHandler {
  constructor(
    @Inject(EXPENSES_PORT) private readonly expensesPort: ExpensesPort
  ) {}

  async handle(query: GetExpensesQuery): Promise<ExpenseCategory[]> {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    return this.expensesPort.getExpensesByCategory(query.tenantId, thirtyDaysAgo, now);
  }
}
