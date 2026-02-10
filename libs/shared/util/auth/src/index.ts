export * from '@virteex/shared-util-auth/src/lib/services/session.service';
export * from '@virteex/shared-util-auth/src/lib/services/token.service';
export * from '@virteex/shared-util-auth/src/lib/guards/auth.guard';
export * from '@virteex/shared-util-auth/src/lib/interceptors/auth.interceptor';

export function hasPermission(userPermissions: string[] | undefined, requiredPermissions: string[]): boolean {
  if (!userPermissions || userPermissions.length === 0) {
    return false;
  }
  return requiredPermissions.every(permission => userPermissions.includes(permission));
}
