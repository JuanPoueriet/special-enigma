import { describe, it, expect } from 'vitest';
import { DesktopReceiptPrinterAdapter } from '../desktop-receipt-printer.adapter';

describe('DesktopReceiptPrinterAdapter', () => {
  it('should print receipt successfully', async () => {
    const adapter = new DesktopReceiptPrinterAdapter();
    const result = await adapter.printReceipt('Test content');
    expect(result.success).toBe(true);
  });

  it('should return status successfully', async () => {
    const adapter = new DesktopReceiptPrinterAdapter();
    const status = await adapter.getStatus();
    expect(status.online).toBe(true);
    expect(status.ready).toBe(true);
  });
});
