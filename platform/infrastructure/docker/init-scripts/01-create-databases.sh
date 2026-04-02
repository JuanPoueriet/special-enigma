#!/bin/bash
set -e

# Databases to create
DATABASES=(virtex_catalog virtex_inventory virtex_identity virtex_billing virtex_crm virtex_accounting virtex_payroll virtex_projects virtex_manufacturing virtex_treasury virtex_purchasing virtex_bi virtex_admin virtex_fixed_assets virtex_fiscal)

for db in "${DATABASES[@]}"; do
  echo "Checking if database '$db' exists..."
  if ! psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" -lqt | cut -d \| -f 1 | grep -qw "$db"; then
    echo "Creating database '$db'..."
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
      CREATE DATABASE "$db";
      GRANT ALL PRIVILEGES ON DATABASE "$db" TO "$POSTGRES_USER";
EOSQL
  else
    echo "Database '$db' already exists."
  fi
done
