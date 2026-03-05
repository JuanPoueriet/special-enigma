// Proxy to avoid circular dependency
export const getTenantContext = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getTenantContext: getContext } = require('@virteex/kernel-tenant');
    return getContext();
  } catch {
    return null;
  }
};
