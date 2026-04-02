import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const COLORS = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = COLORS.reset) {
  console.log(`${color}${message}${COLORS.reset}`);
}

const REQUIRED_PORTS = [
  { name: 'Portal Web', port: 4200 },
  { name: 'Edge Portal (BFF)', port: 3100 },
  { name: 'Identity HTTP', port: 3000 },
  { name: 'Identity gRPC', port: 50051 }
];

const ENV_FILES = [
  '.env.portal-web',
  '.env.edge-portal',
  '.env.identity'
];

log('🚀 Starting Dev Doctor - Local Topology Validation', COLORS.blue);
log('------------------------------------------------', COLORS.blue);

let hasErrors = false;

// 1. Check Port Availability
log('\n🔍 Checking port availability...');
for (const { name, port } of REQUIRED_PORTS) {
  try {
    // This command will return output if the port is in use
    const command = process.platform === 'win32'
      ? `netstat -ano | findstr :${port}`
      : `lsof -i :${port} -t`;

    const output = execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
    if (output.trim()) {
      log(`⚠️  Warning: Port ${port} (${name}) is currently in use. This might cause collisions if it's not the intended process.`, COLORS.yellow);
    }
  } catch (e) {
    log(`✅ Port ${port} (${name}) is available.`, COLORS.green);
  }
}

// 2. Check Env Files
log('\n🔍 Checking environment files...');
for (const file of ENV_FILES) {
  if (existsSync(file)) {
    log(`✅ ${file} exists.`, COLORS.green);
    const content = readFileSync(file, 'utf8');

    if (file === '.env.portal-web') {
      if (!content.includes('PORTAL_EDGE_PROXY_TARGET=')) {
        log(`❌ Error: ${file} is missing PORTAL_EDGE_PROXY_TARGET`, COLORS.red);
        hasErrors = true;
      }
    }

    if (file === '.env.edge-portal') {
      if (!content.includes('PORT=3100')) {
         log(`❌ Error: ${file} should have PORT=3100`, COLORS.red);
         hasErrors = true;
      }
    }
  } else {
    log(`❌ Error: ${file} is missing.`, COLORS.red);
    hasErrors = true;
  }
}

// 3. Consistency Check
log('\n🔍 Checking topology consistency...');
const rootEnvPath = '.env';
if (existsSync(rootEnvPath)) {
  const rootEnv = readFileSync(rootEnvPath, 'utf8');
  const portalWebEnv = existsSync('.env.portal-web') ? readFileSync('.env.portal-web', 'utf8') : '';

  const proxyTargetMatch = portalWebEnv.match(/PORTAL_EDGE_PROXY_TARGET=http:\/\/localhost:(\d+)/);
  const edgePortMatch = rootEnv.match(/EDGE_PORTAL_PORT=(\d+)/);

  if (proxyTargetMatch && edgePortMatch) {
    const proxyPort = proxyTargetMatch[1];
    const edgePort = edgePortMatch[1];

    if (proxyPort === edgePort) {
      log(`✅ Proxy target port (${proxyPort}) matches Edge Portal port (${edgePort}).`, COLORS.green);
    } else {
      log(`❌ Error: Proxy target port (${proxyPort}) does NOT match Edge Portal port (${edgePort}).`, COLORS.red);
      hasErrors = true;
    }
  }
}

log('\n------------------------------------------------', COLORS.blue);
if (hasErrors) {
  log('❌ Dev Doctor found structural issues in your local topology.', COLORS.red);
  process.exit(1);
} else {
  log('✅ Dev Doctor: Local topology is healthy and deterministic.', COLORS.green);
}
