import { createOtelSdk } from '@virteex/shared-util-server-config';

// Configure the SDK
export const otelSDK = createOtelSdk('api-gateway');
