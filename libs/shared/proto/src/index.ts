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

export const API_ACCESS_GATEWAY_PROTO_PATH = resolveProtoPath('api-access-gateway.proto');
export const API_ACCESS_GATEWAY_PACKAGE = 'access';

export const AUTHN_CREDENTIAL_PROTO_PATH = resolveProtoPath('authn-credential.proto');
export const AUTHN_CREDENTIAL_PACKAGE = 'authn';

export const IDENTITY_PROFILE_PROTO_PATH = resolveProtoPath('identity-profile.proto');
export const IDENTITY_PROFILE_PACKAGE = 'profile';

export const TOKEN_PROTO_PATH = resolveProtoPath('token.proto');
export const TOKEN_PACKAGE = 'token';

export const SESSION_PROTO_PATH = resolveProtoPath('session.proto');
export const SESSION_PACKAGE = 'session';

export const AUTHORIZATION_POLICY_PROTO_PATH = resolveProtoPath('authorization-policy.proto');
export const AUTHORIZATION_POLICY_PACKAGE = 'authz';

export const RISK_ADAPTIVE_AUTH_PROTO_PATH = resolveProtoPath('risk-adaptive-auth.proto');
export const RISK_ADAPTIVE_AUTH_PACKAGE = 'risk';

export const IDENTITY_AUDIT_LEDGER_PROTO_PATH = resolveProtoPath('identity-audit-ledger.proto');
export const IDENTITY_AUDIT_LEDGER_PACKAGE = 'audit';

export const PROVISIONING_FEDERATION_PROTO_PATH = resolveProtoPath('provisioning-federation.proto');
export const PROVISIONING_FEDERATION_PACKAGE = 'federation';
