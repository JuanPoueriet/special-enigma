#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const targetFile = join(
  process.cwd(),
  'node_modules',
  '@angular',
  'build',
  'src',
  'builders',
  'dev-server',
  'vite',
  'index.js'
);

if (!existsSync(targetFile)) {
  process.exit(0);
}

const source = readFileSync(targetFile, 'utf8');
const problematicSnippet = "await Promise.resolve().then(() => __importStar(require('vite')));";
const fixedSnippet = "await import('vite');";

if (!source.includes(problematicSnippet)) {
  process.exit(0);
}

const patched = source.replace(problematicSnippet, fixedSnippet);

if (patched === source) {
  console.warn('[patch-angular-build-vite] No changes applied.');
  process.exit(0);
}

writeFileSync(targetFile, patched, 'utf8');
console.log('[patch-angular-build-vite] Applied dynamic import patch for Vite ESM compatibility.');
