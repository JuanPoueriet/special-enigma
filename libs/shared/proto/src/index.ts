import { join, resolve } from 'path';
import { existsSync } from 'fs';

function resolveProtoPath(fileName: string): string {
  const bundledPath = resolve(__dirname, `lib/${fileName}`);
  const workspacePath = resolve(
    process.cwd(),
    `libs/shared/proto/src/lib/${fileName}`,
  );

  const resolvedPath = process.env.NODE_ENV === 'production' ? bundledPath : workspacePath;

  if (!resolvedPath || resolvedPath === 'undefined') {
    throw new Error(`Failed to resolve proto path for ${fileName}: path is ${resolvedPath}`);
  }

  if (!existsSync(resolvedPath)) {
    console.warn(`[ProtoResolver] WARNING: File not found at ${resolvedPath}`);
  }

  return resolvedPath;
}

export const IDENTITY_PROTO_PATH = resolveProtoPath('identity.proto');
export const IDENTITY_PACKAGE = 'identity';

export const BILLING_PROTO_PATH = resolveProtoPath('billing.proto');
export const BILLING_PACKAGE = 'billing';

export const INVENTORY_PROTO_PATH = resolveProtoPath('inventory.proto');
export const INVENTORY_PACKAGE = 'inventory';

export const CATALOG_PROTO_PATH = resolveProtoPath('catalog.proto');
export const CATALOG_PACKAGE = 'catalog';

export const ADMIN_PROTO_PATH = resolveProtoPath('admin.proto');
export const ADMIN_PACKAGE = 'admin';
