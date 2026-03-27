#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const filesToPatchViteImport = [
  'node_modules/@angular/build/src/builders/dev-server/vite/index.js',
  'node_modules/@angular/build/src/builders/unit-test/runners/vitest/executor.js',
  'node_modules/@angular/build/src/builders/dev-server/vite/server.js',
  'node_modules/@angular/build/src/tools/vite/plugins/angular-memory-plugin.js',
  'node_modules/@angular/build/src/tools/vite/plugins/ssr-transform-plugin.js',
];

const problematicSnippet = /await Promise\.resolve\(\)\.then\(\(\) => __importStar\(require\(['"]vite['"]\)\)\)/g;
const fixedSnippet = "await import('vite')";

for (const relativePath of filesToPatchViteImport) {
  const targetFile = join(process.cwd(), relativePath);
  if (existsSync(targetFile)) {
    const source = readFileSync(targetFile, 'utf8');
    if (source.match(problematicSnippet)) {
      const patched = source.replace(problematicSnippet, fixedSnippet);
      writeFileSync(targetFile, patched, 'utf8');
      console.log(`[patch-angular-build-vite] Applied dynamic import patch for Vite in ${relativePath}`);
    }
  }
}

// Patch for hogan.js / Console Ninja issue in node_modules/@angular/build/src/tools/vite/utils.js
const utilsFile = join(process.cwd(), 'node_modules/@angular/build/src/tools/vite/utils.js');
if (existsSync(utilsFile)) {
  const source = readFileSync(utilsFile, 'utf8');
  const onLoadSnippet = 'build.onLoad({ filter: /\\.[cm]?js$/ }, async (args) => {';
  const onLoadFixed = 'build.onLoad({ filter: /\\.[cm]?js$/ }, async (args) => {\n                    if (!(0, node_path_1.isAbsolute)(args.path)) return;';

  if (source.includes(onLoadSnippet) && !source.includes('isAbsolute)(args.path)')) {
    const patched = source.replace(onLoadSnippet, onLoadFixed);
    writeFileSync(utilsFile, patched, 'utf8');
    console.log('[patch-angular-build-vite] Applied isAbsolute patch for hogan.js fix in node_modules/@angular/build/src/tools/vite/utils.js');
  }
}
