const { loadSchema } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { isObjectType, isInterfaceType, isInputObjectType } = require('graphql');

async function validateFederationContracts(schemaPath) {
  console.log('Starting deep semantic validation for: ' + schemaPath);
  let errors = [];

  try {
    const schema = await loadSchema(schemaPath, { loaders: [new GraphQLFileLoader()] });

    const types = schema.getTypeMap();
    for (const typeName in types) {
      if (typeName.startsWith('__')) continue;
      const type = types[typeName];

      if (!type.description) {
        errors.push('[GOVERNANCE] Type "' + typeName + '" is missing a description.');
      }

      if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
        const fields = type.getFields();
        for (const fieldName in fields) {
          const field = fields[fieldName];

          if (!field.description) {
            errors.push('[GOVERNANCE] Field "' + typeName + '.' + fieldName + '" is missing a description.');
          }

          const isSensitive = fieldName.toLowerCase().includes('password') ||
                              fieldName.toLowerCase().includes('token') ||
                              fieldName.toLowerCase().includes('secret') ||
                              fieldName.toLowerCase().includes('ssn') ||
                              fieldName.toLowerCase().includes('salary');

          const directives = field.astNode ? field.astNode.directives || [] : [];
          const hasSecurityDirective = directives.some(d => ['auth', 'sensitive', 'protected', 'authenticated'].includes(d.name.value));

          if (isSensitive && !hasSecurityDirective) {
            errors.push('[SECURITY] Field "' + typeName + '.' + fieldName + '" appears sensitive but lacks @auth or @sensitive directive.');
          }
        }
      }
    }
  } catch (e) {
    console.error('Failed to load or parse schema: ' + e.message);
    process.exit(1);
  }

  if (errors.length > 0) {
    console.error('\n❌ Contract Validation Failed with the following errors:');
    errors.forEach(err => console.error('  - ' + err));
    console.error('\nTotal Errors: ' + errors.length);
    process.exit(1);
  }

  console.log('\n✅ Contract Validation Passed. 0 errors detected.');
}

const schemaPath = process.argv[2];
if (!schemaPath) {
  console.error('Usage: node validate-federation-contracts.js <schemaPath>');
  process.exit(1);
}

validateFederationContracts(schemaPath);
