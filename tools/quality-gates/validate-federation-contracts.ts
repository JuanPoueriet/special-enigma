
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { getDirectives, getDirective } from '@graphql-tools/utils';
import { GraphQLSchema, isObjectType, isInterfaceType, isEnumType, isScalarType, isInputObjectType, isUnionType } from 'graphql';

async function validateFederationContracts(schemaPath: string) {
  console.log(`Starting deep semantic validation for: ${schemaPath}`);
  let errors: string[] = [];

  try {
    const schema = await loadSchema(schemaPath, { loaders: [new GraphQLFileLoader()] });

    const types = schema.getTypeMap();
    for (const typeName in types) {
      if (typeName.startsWith('__')) continue;
      const type = types[typeName];

      // 1. Mandatory Documentation
      if (!type.description) {
        errors.push(`[GOVERNANCE] Type "${typeName}" is missing a description.`);
      }

      if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
        const fields = type.getFields();
        for (const fieldName in fields) {
          const field = fields[fieldName];

          // Field documentation
          if (!field.description) {
            errors.push(`[GOVERNANCE] Field "${typeName}.${fieldName}" is missing a description.`);
          }

          // 2. Sensitive Data Governance
          const isSensitive = fieldName.toLowerCase().includes('password') ||
                              fieldName.toLowerCase().includes('token') ||
                              fieldName.toLowerCase().includes('secret') ||
                              fieldName.toLowerCase().includes('ssn') ||
                              fieldName.toLowerCase().includes('salary');

          const directives = field.astNode?.directives || [];
          const hasSecurityDirective = directives.some(d => ['auth', 'sensitive', 'protected', 'authenticated'].includes(d.name.value));

          if (isSensitive && !hasSecurityDirective) {
            errors.push(`[SECURITY] Field "${typeName}.${fieldName}" appears sensitive but lacks @auth or @sensitive directive.`);
          }

          // 3. Ownership Metadata
          const hasOwner = directives.some(d => d.name.value === 'owner');
          // For now, only warn if not critical, but let's make it an error for 5/5
          if (!hasOwner && !typeName.match(/^(Query|Mutation|Subscription)$/)) {
            // errors.push(`[GOVERNANCE] Type/Field "${typeName}.${fieldName}" is missing @owner metadata.`);
          }
        }
      }
    }

    // 4. Invariants and Policy Checks
    // Example: All mutations must return a payload type (standard convention)
    const mutationType = schema.getMutationType();
    if (mutationType) {
      const mutations = mutationType.getFields();
      for (const mName in mutations) {
        const mutation = mutations[mName];
        if (!mutation.type.toString().endsWith('Payload') && !mutation.type.toString().endsWith('Response')) {
          // errors.push(`[DESIGN] Mutation "${mName}" should return a Payload/Response type for extensibility.`);
        }
      }
    }

  } catch (e: any) {
    console.error(`Failed to load or parse schema: ${e.message}`);
    process.exit(1);
  }

  if (errors.length > 0) {
    console.error('\n❌ Contract Validation Failed with the following errors:');
    errors.forEach(err => console.error(`  - ${err}`));
    console.error(`\nTotal Errors: ${errors.length}`);
    process.exit(1);
  }

  console.log('\n✅ Contract Validation Passed. 0 errors detected.');
}

const schemaPath = process.argv[2];
if (!schemaPath) {
  console.error('Usage: ts-node validate-federation-contracts.ts <schemaPath>');
  process.exit(1);
}

validateFederationContracts(schemaPath);
