import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['apps', 'libs'];
const REQUIRED_TAG_FAMILIES = ['scope', 'type', 'platform', 'criticality'];

const LEGACY_PROJECT_MAP = {
  'virteex-gateway': 'virteex-api-gateway',
  'virteex-gateway-e2e': 'virteex-api-gateway-e2e',
  'ops-console-web': 'virteex-ops-web',
  'ops-console-web-e2e': 'virteex-ops-web-e2e',
  'billing-presentation': 'api-billing-presentation',
};

const LEGACY_TS_ALIASES = {
  '@virteex/billing-presentation': '@virteex/api-billing-presentation',
};

const APP_NAME_PATTERN = /^virteex-[a-z0-9-]+$/;
const LIB_NAME_PATTERN = /^(api|application|contracts|domain|infra|kernel|shared|[a-z0-9]+)-[a-z0-9-]+$/;
const ALIAS_PATTERN = /^@virteex\/[a-z0-9-]+$/;
const SELECTOR_PATTERN = /^virteex-[a-z0-9-]+$/;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist') continue;
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }
    yield fullPath;
  }
}

const errors = [];
const warnings = [];

for (const root of ROOTS) {
  for (const file of walk(root)) {
    if (file.endsWith('project.json')) {
      const project = JSON.parse(readFileSync(file, 'utf8'));
      const name = project.name;
      const isAppRoot = file.startsWith('apps/');

      if (LEGACY_PROJECT_MAP[name]) {
        warnings.push(`${file}: legacy project name '${name}' is allowed temporarily, migrate to '${LEGACY_PROJECT_MAP[name]}'.`);
      }

      const validName = isAppRoot ? APP_NAME_PATTERN.test(name) : LIB_NAME_PATTERN.test(name);
      if (!validName) {
        errors.push(`${file}: project name '${name}' does not match the naming standard.`);
      }

      const tags = project.tags ?? [];
      for (const family of REQUIRED_TAG_FAMILIES) {
        const familyMatches = tags.filter((tag) => tag.startsWith(`${family}:`));
        if (familyMatches.length !== 1) {
          errors.push(`${file}: expected exactly one '${family}:*' tag and found ${familyMatches.length}.`);
        }
      }
    }

    if (file.endsWith('.ts')) {
      const content = readFileSync(file, 'utf8');
      const selectorRegex = /selector:\s*'([^']+)'/g;
      for (const match of content.matchAll(selectorRegex)) {
        const selector = match[1];
        if (selector.startsWith('[') || selector.startsWith('.')) {
          continue;
        }
        if (!SELECTOR_PATTERN.test(selector)) {
          errors.push(`${file}: selector '${selector}' must use the 'virteex-*' prefix.`);
        }
      }
    }
  }
}

const tsconfig = JSON.parse(readFileSync('tsconfig.base.json', 'utf8'));
const aliases = Object.keys(tsconfig.compilerOptions?.paths ?? {});
for (const alias of aliases) {
  const baseAlias = alias.endsWith('/*') ? alias.slice(0, -2) : alias;
  if (LEGACY_TS_ALIASES[baseAlias]) continue;
  if (!ALIAS_PATTERN.test(baseAlias)) {
    errors.push(`tsconfig.base.json: TS alias '${baseAlias}' does not match '@virteex/<kebab-case>'.`);
  }
}

if (warnings.length > 0) {
  console.warn('⚠️ Naming convention warnings:\n');
  for (const warning of warnings) {
    console.warn(` - ${warning}`);
  }
  console.warn('');
}

if (errors.length > 0) {
  console.error('❌ Naming convention validation failed:\n');
  for (const error of errors) {
    console.error(` - ${error}`);
  }
  process.exit(1);
}

console.log('✅ Naming convention validation passed.');
