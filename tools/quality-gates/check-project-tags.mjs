import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const MANDATORY_TAGS = ['type', 'scope', 'platform', 'criticality'];

function getProjectFiles() {
  const output = execSync('find apps libs -name "project.json"').toString();
  return output.split('\n').filter(Boolean);
}

function validateTags(filePath) {
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const tags = content.tags || [];
  const tagKeys = tags.map(tag => tag.split(':')[0]);

  const missing = MANDATORY_TAGS.filter(key => !tagKeys.includes(key));
  return missing;
}

const projects = getProjectFiles();
let hasError = false;

console.log(`Checking ${projects.length} projects for mandatory tags...`);

projects.forEach(projectPath => {
  const missing = validateTags(projectPath);
  if (missing.length > 0) {
    console.error(`❌ Project ${projectPath} is missing mandatory tags: ${missing.join(', ')}`);
    hasError = true;
  }
});

if (hasError) {
  console.error('\nTotal projects with errors found.');
  process.exit(1);
} else {
  console.log('✅ All projects have mandatory tags.');
}
