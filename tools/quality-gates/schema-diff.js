const { diff, CriticalityLevel } = require('@graphql-inspector/core');
const { loadSchema } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const fs = require('fs');

async function compareSchemas(oldSchemaPath, newSchemaPath) {
  if (!fs.existsSync(oldSchemaPath)) {
    console.warn('⚠️ Old schema not found at ' + oldSchemaPath + '. Skipping diff.');
    return;
  }

  const oldSchema = await loadSchema(oldSchemaPath, { loaders: [new GraphQLFileLoader()] });
  const newSchema = await loadSchema(newSchemaPath, { loaders: [new GraphQLFileLoader()] });

  const changes = await diff(oldSchema, newSchema);

  const breakingChanges = changes.filter(c => c.criticality.level === CriticalityLevel.Breaking);
  const dangerousChanges = changes.filter(c => c.criticality.level === CriticalityLevel.Dangerous);
  const safeChanges = changes.filter(c => c.criticality.level === CriticalityLevel.NonBreaking);

  console.log('\nChange Classification Report:');
  console.log('- SAFE: ' + safeChanges.length);
  console.log('- DANGEROUS: ' + dangerousChanges.length);
  console.log('- BREAKING: ' + breakingChanges.length);

  if (breakingChanges.length > 0) {
    console.error('\n❌ BREAKING CHANGES DETECTED (BLOCKING):');
    breakingChanges.forEach(c => console.error('  - [' + c.type + '] ' + c.message));
    process.exit(1);
  }

  console.log('\n✅ Schema diff validation passed. No blocking changes detected.');
}

const [oldPath, newPath] = process.argv.slice(2);
if (oldPath && newPath) {
  compareSchemas(oldPath, newPath);
}
