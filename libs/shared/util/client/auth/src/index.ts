export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  permissions: string[];
}

export const hasPermission = (permissions: string[] | undefined, required: string[]) => {
  if (!required || required.length === 0) return true;
  if (!permissions) return false;
  return required.every(p => permissions.includes(p));
};

export * from './lib/services/storage/secure-storage.service';
export * from './lib/guards/auth-guard';
export * from './lib/interceptors/auth.interceptor';
export * from './lib/services/auth-queue.service';
