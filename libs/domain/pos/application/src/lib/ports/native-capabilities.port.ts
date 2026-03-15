export interface ReceiptPrinterPort {
  printReceipt(content: string): Promise<{ success: boolean; error?: string }>;
  getStatus(): Promise<{ online: boolean; ready: boolean }>;
}

export interface CashDrawerPort {
  openDrawer(): Promise<{ success: boolean; error?: string }>;
}

export interface LocalJournalPort {
  appendEntry(entry: any): Promise<{ success: boolean; entryId: string }>;
  getEntries(limit?: number): Promise<any[]>;
}

export interface OfflineSyncPort {
  syncPendingTransactions(): Promise<{ synced: number; failed: number }>;
  isOnline(): Promise<boolean>;
}
