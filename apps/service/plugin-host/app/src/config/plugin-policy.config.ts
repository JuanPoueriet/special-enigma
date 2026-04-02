export const PLUGIN_POLICY = {
  egress: {
    allowlist: [
      'api.virtex.io',
      'auth.virtex.io',
      'trusted-partner.com',
      'api.taxjar.com',
    ],
    denyByDefault: true,
  },
  limits: {
    memoryMb: 128,
    timeoutMs: 1000,
    cpuPercentage: 10,
  }
};
