import { join } from 'path';

function resolveProtoPath(fileName: string): string {
  const bundledPath = join(__dirname, `lib/${fileName}`);
  const workspacePath = join(
    process.cwd(),
    `libs/shared/proto/src/lib/${fileName}`,
  );

  return process.env.NODE_ENV === 'production' ? bundledPath : workspacePath;
}

export const IDENTITY_PROTO_PATH = resolveProtoPath('identity.proto');
export const IDENTITY_PACKAGE = 'identity';

export const BILLING_PROTO_PATH = resolveProtoPath('billing.proto');
export const BILLING_PACKAGE = 'billing';

export const INVENTORY_PROTO_PATH = resolveProtoPath('inventory.proto');
export const INVENTORY_PACKAGE = 'inventory';
