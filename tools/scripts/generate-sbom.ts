import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Script for generating an SBOM in CycloneDX format.
 * Requirement for security compliance 10/10.
 */
function generateSbom() {
  console.log('--- Generating SBOM ---');
  try {
    const output = execSync('npx cyclonedx-npm --output-format JSON --output-file sbom.json', { encoding: 'utf-8' });
    console.log(output);
    console.log('SBOM generated successfully at sbom.json');
  } catch (error) {
    console.error('FATAL: Failed to generate SBOM. Placeholders are prohibited for enterprise readiness.');
    process.exit(1);
  }
}

generateSbom();
