
import { diff, ChangeType, CriticalityLevel } from '@graphql-inspector/core';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

async function compareSchemas(oldSchemaPath: string, newSchemaPath: string) {
  const oldSchema = await loadSchema(oldSchemaPath, { loaders: [new GraphQLFileLoader()] });
  const newSchema = await loadSchema(newSchemaPath, { loaders: [new GraphQLFileLoader()] });

  const changes = await diff(oldSchema, newSchema);

  const breakingChanges = changes.filter(c => c.criticality.level === CriticalityLevel.Breaking);
  const dangerousChanges = changes.filter(c => c.criticality.level === CriticalityLevel.Dangerous);
  const safeChanges = changes.filter(c => c.criticality.level === CriticalityLevel.NonBreaking);

  console.log(`\nChange Classification Report:`);
  console.log(`- SAFE: ${safeChanges.length}`);
  console.log(`- DANGEROUS: ${dangerousChanges.length}`);
  console.log(`- BREAKING: ${breakingChanges.length}`);

  if (breakingChanges.length > 0) {
    console.error('\n❌ BREAKING CHANGES DETECTED (BLOCKING):');
    breakingChanges.forEach(c => console.error(`  - [${c.type}] ${c.message}`));
    process.exit(1);
  }

  if (dangerousChanges.length > 0) {
    console.warn('\n⚠️ DANGEROUS CHANGES DETECTED (MIGHT REQUIRE WAIVER):');
    dangerousChanges.forEach(c => console.warn(`  - [${c.type}] ${c.message}`));
    // In a strict Level 5 environment, dangerous changes might also be blocked unless a waiver is provided
  }

  console.log('\n✅ Schema diff validation passed. No blocking changes detected.');
}

const [oldPath, newPath] = process.argv.slice(2);
if (oldPath && newPath) {
  compareSchemas(oldPath, newPath);
}
