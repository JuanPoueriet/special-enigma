import { AsyncLocalStorage } from 'async_hooks';
import { TenantContext } from './tenant-context.interface';

const tenantStorage = new AsyncLocalStorage<TenantContext>();

export const runWithTenantContext = <T>(context: TenantContext, callback: () => T): T => {
  return tenantStorage.run(context, callback);
};

export const getTenantContext = (): TenantContext | undefined => {
  return tenantStorage.getStore();
};

export const requireTenantContext = (reason = 'tenant context is required'): TenantContext => {
  const context = getTenantContext();
  if (!context?.tenantId) {
    throw new Error(reason);
  }
  return context;
};

export const runWithRequiredTenantContext = async <T>(context: TenantContext, callback: () => Promise<T>): Promise<T> => {
  if (!context?.tenantId) {
    throw new Error('Refusing to execute async operation without tenant context.');
  }
  return tenantStorage.run(context, callback);
};
