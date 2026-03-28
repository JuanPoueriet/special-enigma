export const EXPENSES_PORT = 'EXPENSES_PORT';

export interface ExpenseCategory {
  category: string;
  amount: number;
}

export interface ExpensesPort {
  getExpensesByCategory(tenantId: string, startDate: Date, endDate: Date): Promise<ExpenseCategory[]>;
}
