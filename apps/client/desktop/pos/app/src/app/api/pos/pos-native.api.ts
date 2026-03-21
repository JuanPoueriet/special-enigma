import { ipcMain } from 'electron';
import { DesktopReceiptPrinterAdapter } from '@virteex/platform-desktop-printing';
import { DesktopCashDrawerAdapter } from '@virteex/platform-desktop-hardware';
import { DesktopLocalJournalAdapter } from '@virteex/platform-desktop-storage';
import { DesktopOfflineSyncAdapter } from '@virteex/platform-desktop-core';

export class PosNativeApi {
  private static printer = new DesktopReceiptPrinterAdapter();
  private static drawer = new DesktopCashDrawerAdapter();
  private static journal = new DesktopLocalJournalAdapter();
  private static sync = new DesktopOfflineSyncAdapter();

  static registerHandlers() {
    ipcMain.handle('pos:print-receipt', async (event, content: string) => {
      return this.printer.printReceipt(content);
    });

    ipcMain.handle('pos:get-printer-status', async () => {
      return this.printer.getStatus();
    });

    ipcMain.handle('pos:open-drawer', async () => {
      return this.drawer.openDrawer();
    });

    ipcMain.handle('pos:journal-append', async (event, entry: any) => {
      return this.journal.appendEntry(entry);
    });

    ipcMain.handle('pos:journal-get-entries', async (event, limit?: number) => {
      return this.journal.getEntries(limit);
    });

    ipcMain.handle('pos:sync-pending', async () => {
      return this.sync.syncPendingTransactions();
    });

    ipcMain.handle('pos:is-online', async () => {
      return this.sync.isOnline();
    });
  }
}
