import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('posNative', {
  printing: {
    printReceipt: (content: string) => ipcRenderer.invoke('pos:print-receipt', content),
    getStatus: () => ipcRenderer.invoke('pos:get-printer-status'),
  },
  hardware: {
    openDrawer: () => ipcRenderer.invoke('pos:open-drawer'),
  },
  journal: {
    appendEntry: (entry: any) => ipcRenderer.invoke('pos:journal-append', entry),
    getEntries: (limit?: number) => ipcRenderer.invoke('pos:journal-get-entries', limit),
  },
  sync: {
    syncPendingTransactions: () => ipcRenderer.invoke('pos:sync-pending'),
    isOnline: () => ipcRenderer.invoke('pos:is-online'),
  }
});
