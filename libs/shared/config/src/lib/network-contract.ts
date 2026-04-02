/**
 * Local Network Contract
 *
 * This file defines the explicit ports and targets for local development.
 * It serves as the single source of truth to avoid port collisions and
 * configuration drift.
 */

export const PORTAL_WEB_PORT = 4200;
export const EDGE_PORTAL_PORT = 3100;
export const IDENTITY_HTTP_PORT = 3000;
export const IDENTITY_GRPC_PORT = 50051;

export const PORTAL_EDGE_PROXY_TARGET = `http://localhost:${EDGE_PORTAL_PORT}`;
export const IDENTITY_SERVICE_URL = `http://localhost:${IDENTITY_HTTP_PORT}`;
export const IDENTITY_GRPC_URL = `localhost:${IDENTITY_GRPC_PORT}`;
