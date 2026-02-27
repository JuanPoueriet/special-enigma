import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['apps', 'libs'];
const requiredPrefixes = ['scope:', 'type:', 'platform:', 'criticality:'];

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue;
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry === 'project.json') {
      yield fullPath;
    }
  }
}

const errors = [];
for (const root of roots) {
  for (const file of walk(root)) {
    const project = JSON.parse(readFileSync(file, 'utf8'));
    const tags = project.tags ?? [];

    const missingRequired = requiredPrefixes.filter((prefix) => !tags.some((tag) => tag.startsWith(prefix)));
    if (missingRequired.length > 0) {
      errors.push(`${file}: missing required tag families [${missingRequired.join(', ')}]`);
    }

    const malformedTags = tags.filter((tag) => !tag.includes(':'));
    if (malformedTags.length > 0) {
      errors.push(`${file}: malformed tags [${malformedTags.join(', ')}]`);
    }

    const legacyTags = tags.filter((tag) => tag.startsWith('domain:'));
    if (legacyTags.length > 0) {
      errors.push(`${file}: legacy tags are not allowed [${legacyTags.join(', ')}]`);
    }
  }
}

if (errors.length > 0) {
  console.error('❌ Project tag validation failed:\n');
  for (const error of errors) {
    console.error(` - ${error}`);
  }
  process.exit(1);
}

console.log('✅ Project tag validation passed.');
