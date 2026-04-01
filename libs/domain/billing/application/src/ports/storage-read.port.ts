export interface StorageReadPort {
  getFileCount(tenantId: string): Promise<number>;
}

export const STORAGE_READ_PORT = Symbol('STORAGE_READ_PORT');
