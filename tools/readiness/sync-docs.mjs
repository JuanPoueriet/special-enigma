import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const sotPath = path.resolve('config/readiness/operational-readiness.sot.json');
const matrixPath = path.resolve('config/readiness/commercial-eligibility.matrix.json');
const docPath = path.resolve('docs/commercial/country-module-readiness-matrix.md');

function updateDoc(sot) {
  const content = fs.readFileSync(docPath, 'utf8');
  const lines = content.split('\n');
  const tableHeaderIndex = lines.findIndex(l => l.includes('| País | Fiscal |'));

  if (tableHeaderIndex === -1) return;

  const countries = ['MX', 'BR', 'CO', 'US', 'DO'];
  const modules = ['fiscal', 'billing', 'inventory', 'marketplace', 'manufacturing', 'projects', 'fixedAssets', 'payroll'];

  for (const country of countries) {
    const rowIndex = lines.findIndex(l => l.startsWith(`| ${country} |`));
    if (rowIndex === -1) continue;

    const cells = [country];
    for (const mod of modules) {
        cells.push(sot.modules[mod]?.[country]?.status || '-');
    }
    lines[rowIndex] = `| ${cells.join(' | ')} |`;
  }

  fs.writeFileSync(docPath, lines.join('\n'));
}

function updateMatrix(sot, rawSot) {
  const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'));
  matrix.modules = sot.modules;
  matrix.generatedFrom = {
      source: "config/readiness/operational-readiness.sot.json",
      sha256: crypto.createHash('sha256').update(rawSot).digest('hex')
  };
  fs.writeFileSync(matrixPath, JSON.stringify(matrix, null, 2));
}

async function main() {
  console.log('🔄 Synchronizing commercial documentation and eligibility matrix with SOT...');
  const rawSot = fs.readFileSync(sotPath, 'utf8');
  const sot = JSON.parse(rawSot);

  updateDoc(sot);
  updateMatrix(sot, rawSot);

  console.log('✅ Commercial documentation and eligibility matrix synchronized successfully.');
}

main().catch(console.error);
