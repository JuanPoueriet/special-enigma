import { OfflineSyncPort } from '@virteex/domain-pos-application';
import { net } from 'electron';

export class DesktopOfflineSyncAdapter implements OfflineSyncPort {
  async syncPendingTransactions(): Promise<{ synced: number; failed: number }> {
    console.log('Syncing pending transactions from desktop');
    return { synced: 0, failed: 0 };
  }

  async isOnline(): Promise<boolean> {
    // In Electron main process, we can use net.online or check a host
    return net.online;
  }
}
