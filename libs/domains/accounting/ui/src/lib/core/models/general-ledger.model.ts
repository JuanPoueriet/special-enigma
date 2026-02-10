export interface GeneralLedgerLine {
  id: string;
  accountId: string;
  debit: number;
  credit: number;
}

export interface GeneralLedger {
  lines: GeneralLedgerLine[];
  totalDebit: number;
  totalCredit: number;
}
