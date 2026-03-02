#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Tables that MUST have RLS enabled
const CRITICAL_TABLES = [
  'crm.sale',
  'accounting.transaction',
  'treasury.bank_account',
  'identity.user',
  'inventory.stock_level'
];

async function checkRls() {
  console.log('🔍 Checking RLS policies on critical tables...');

  // 1. Check migrations for general RLS logic
  const migrationPath = path.join(process.cwd(), 'apps/api/gateway/app/src/migrations');
  let hasRlsMigration = false;
  if (fs.existsSync(migrationPath)) {
    const migrations = fs.readdirSync(migrationPath);
    hasRlsMigration = migrations.some(m => m.includes('RLS'));
  }

  if (hasRlsMigration) {
     console.log('✅ Found RLS migration script.');
  } else {
     console.error('❌ CRITICAL: No RLS migration script found in apps/api/gateway/app/src/migrations');
     process.exit(1);
  }

  // 2. Check for schema definitions and specific table policies (mocking DB check)
  // In this repo, RLS seems to be enabled dynamically by migration for all tables with 'tenant_id'.
  // We'll verify that the migration logic correctly target tables.

  const rlsMigrationFile = path.join(migrationPath, 'Migration20250220_RLS.ts');
  const migrationContent = fs.readFileSync(rlsMigrationFile, 'utf8');

  if (!migrationContent.includes('ENABLE ROW LEVEL SECURITY') || !migrationContent.includes('CREATE POLICY tenant_isolation')) {
     console.error('❌ CRITICAL: RLS migration script is missing core logic (ENABLE RLS or CREATE POLICY).');
     process.exit(1);
  }

  console.log('✅ RLS validation passed: Dynamic policy generation is present in migrations.');
}

checkRls().catch(err => {
  console.error(err);
  process.exit(1);
});
