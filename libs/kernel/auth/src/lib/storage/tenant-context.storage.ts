import { AsyncLocalStorage } from 'async_hooks';
import { TenantContext } from '../interfaces/tenant-context.interface';

const tenantStorage = new AsyncLocalStorage<TenantContext>();

export const runWithTenantContext = <T>(context: TenantContext, callback: () => T): T => {
  return tenantStorage.run(context, callback);
};

export const getTenantContext = (): TenantContext | undefined => {
  return tenantStorage.getStore();
};
