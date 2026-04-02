import { ReceiptPrinterPort } from '@virtex/domain-pos-application';

export class DesktopReceiptPrinterAdapter implements ReceiptPrinterPort {
  async printReceipt(content: string): Promise<{ success: boolean; error?: string }> {
    console.log('Printing to desktop printer:', content);
    // Real implementation would use Electron's ipcRenderer to call main process printing
    return { success: true };
  }

  async getStatus(): Promise<{ online: boolean; ready: boolean }> {
    return { online: true, ready: true };
  }
}
