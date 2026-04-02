/**
 * Frontend Proxy Configuration
 *
 * This proxy is strictly configured to point to the Edge Portal (BFF).
 * It requires the PORTAL_EDGE_PROXY_TARGET environment variable.
 * Fallbacks and silent failures are disabled to ensure deterministic behavior.
 */

const target = process.env['PORTAL_EDGE_PROXY_TARGET'];

if (!target) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    '[web-portal proxy] FATAL: PORTAL_EDGE_PROXY_TARGET is not defined.',
  );
  console.error(
    'Please set it in your .env.portal-web or .env file (e.g., http://localhost:3100).',
  );
  process.exit(1);
}

try {
  new URL(target);
} catch {
  console.error(
    '\x1b[31m%s\x1b[0m',
    `[web-portal proxy] FATAL: Invalid PORTAL_EDGE_PROXY_TARGET format: "${target}"`,
  );
  process.exit(1);
}

console.log(`\x1b[32m[web-portal proxy] Routing /api to: ${target}\x1b[0m`);

module.exports = {
  '/api': {
    target,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api',
    },
    onProxyReq: (proxyReq, req) => {
      // Ensure X-Request-Id is propagated if present in the original request
      const requestId = req.headers['x-request-id'];
      if (requestId) {
        proxyReq.setHeader('X-Request-Id', requestId);
      }
    },
    onError: (err, req) => {
      console.error(`[web-portal proxy] Proxy error for ${req.url}:`, err.message);
    }
  },
  '/desktop-app-api': {
    target,
    secure: false,
    changeOrigin: true,
  },
};
