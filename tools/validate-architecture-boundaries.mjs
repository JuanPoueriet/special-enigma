#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const domainsRoot = 'libs/domains';
const allDomains = readdirSync(domainsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const strictLayerDomains = new Set(
  allDomains.filter((domain) => {
    const base = join(domainsRoot, domain);
    return existsSync(join(base, 'domain')) && existsSync(join(base, 'application'));
  })
);

const temporaryExclusionAllowlist = new Map(
  (process.env.ARCH_BOUNDARY_EXCLUSION_JUSTIFICATIONS ?? '')
    .split(';')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [domain, ...reasonParts] = entry.split(':');
      return [domain?.trim(), reasonParts.join(':').trim()];
    })
    .filter(([domain, reason]) => Boolean(domain) && Boolean(reason))
);

const excludedDomains = (process.env.ARCH_BOUNDARY_EXCLUDED_DOMAINS ?? '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);
const governedDomains = allDomains.filter((domain) => !excludedDomains.includes(domain));
const uncoveredDomains = allDomains.filter((domain) => !governedDomains.includes(domain));
const unjustifiedUncoveredDomains = uncoveredDomains.filter(
  (domain) => !temporaryExclusionAllowlist.get(domain)
);

const checks = [];

function addSearchCheck(name, command) {
  checks.push({ name, command });
}

for (const domain of allDomains) {
  if (!governedDomains.includes(domain)) continue;

  const base = join(domainsRoot, domain);
  const domainSrc = join(base, 'domain/src');
  const appUseCases = join(base, 'application/src/lib/use-cases');

  if (strictLayerDomains.has(domain) && existsSync(domainSrc)) {
    addSearchCheck(
      `[${domain}] No framework imports in domain layer`,
      `rg --line-number --glob '${domainSrc}/**/*.ts' "@nestjs/|@mikro-orm/|class-validator|rxjs"`
    );
  }

  if (strictLayerDomains.has(domain) && existsSync(appUseCases)) {
    addSearchCheck(
      `[${domain}] No HTTP exceptions in application use-cases`,
      `rg --line-number --glob '${appUseCases}/**/*.ts' "import\\s+\\{[^}]*\\b(NotFoundException|BadRequestException|ForbiddenException|UnauthorizedException|ConflictException)\\b[^}]*\\}\\s+from '@nestjs/common'"`
    );
    addSearchCheck(
      `[${domain}] No MikroORM imports in application use-cases`,
      `rg --line-number --glob '${appUseCases}/**/*.ts' "@mikro-orm/"`
    );
  }

  const appPath = `apps/backend/virteex-${domain}-service/src/app`;
  if (existsSync(appPath) && existsSync(join(base, 'presentation'))) {
    addSearchCheck(
      `[${domain}] App shell must not define duplicate presentation artifacts`,
      `rg --line-number --glob '${appPath}/**/*.ts' "@Resolver\\(|@InputType\\(|@ObjectType\\("`
    );
  }

  if (existsSync(appPath) && existsSync(join(base, 'infrastructure'))) {
    addSearchCheck(
      `[${domain}] App shell must not contain infrastructure adapters`,
      `rg --line-number --glob '${appPath}/**/*.ts' "class\\s+.*(Gateway|Repository|Adapter)"`
    );
  }

  for (const layer of ['domain', 'application', 'infrastructure', 'presentation', 'contracts']) {
    const projectJsonPath = join(base, layer, 'project.json');
    if (!existsSync(projectJsonPath)) continue;
    const project = JSON.parse(readFileSync(projectJsonPath, 'utf8'));
    const tags = project.tags ?? [];
    if (!tags.includes(`scope:${domain}`)) {
      checks.push({
        name: `[${domain}] ${layer} project must include scope:${domain}`,
        customError: `${projectJsonPath}: missing required tag scope:${domain}`,
      });
    }
  }
}

let hasViolations = false;
for (const check of checks) {
  if (check.customError) {
    hasViolations = true;
    console.error(`✖ ${check.name}`);
    console.error(check.customError);
    console.error('');
    continue;
  }

  try {
    const output = execSync(check.command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    if (output) {
      hasViolations = true;
      console.error(`✖ ${check.name}`);
      console.error(output);
      console.error('');
    }
  } catch (error) {
    const output = error.stdout?.toString().trim();
    if (!output) continue;
    hasViolations = true;
    console.error(`✖ ${check.name}`);
    console.error(output);
    console.error('');
  }
}

if (uncoveredDomains.length) {
  console.log('ℹ Domain coverage report:');
  for (const domain of uncoveredDomains) {
    const reason = temporaryExclusionAllowlist.get(domain);
    if (reason) {
      console.log(`  - ${domain}: excluded temporarily (${reason})`);
      continue;
    }

    console.error(`  - ${domain}: excluded without justification`);
  }
}

if (unjustifiedUncoveredDomains.length) {
  hasViolations = true;
  console.error(
    `✖ Uncovered domains without temporary allowlist justification: ${unjustifiedUncoveredDomains.join(', ')}`
  );
}

if (hasViolations) process.exit(1);
console.log(`✔ Architecture boundary checks passed for governed domains: ${governedDomains.join(', ')}`);
