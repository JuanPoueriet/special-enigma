import { getTenantContext as getContext } from '@virtex/kernel-tenant-context';

export const getTenantContext = () => {
  return getContext();
};
