const { execSync } = require('node:child_process');

const CUSTOM_TARGET =
  process.env['PORTAL_EDGE_PROXY_TARGET'] ||
  'http://portal-edge.virtex.local:3100';
const FALLBACK_TARGET =
  process.env['PORTAL_EDGE_PROXY_FALLBACK'] || 'http://localhost:3100';

function canResolveHost(hostname) {
  const command =
    process.platform === 'win32'
      ? `nslookup ${hostname}`
      : `getent hosts ${hostname}`;

  try {
    execSync(command, {
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return true;
  } catch {
    return false;
  }
}

const host = new URL(CUSTOM_TARGET).hostname;
const target = canResolveHost(host) ? CUSTOM_TARGET : FALLBACK_TARGET;

if (target !== CUSTOM_TARGET) {
  console.warn(
    `[web-portal proxy] Could not resolve ${host}. Falling back to ${FALLBACK_TARGET}. ` +
      'Set PORTAL_EDGE_PROXY_TARGET or configure /etc/hosts to use the custom edge domain.',
  );
}

module.exports = {
  '/api': {
    target,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api',
    },
  },
  '/desktop-app-api': {
    target,
    secure: false,
    changeOrigin: true,
  },
};
