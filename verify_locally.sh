#!/bin/bash
set -e

echo "Starting local verification..."

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    # Using --ignore-scripts to avoid potential native compilation issues in some environments
    npm ci --legacy-peer-deps --ignore-scripts
fi

echo "Running Lint..."
# Use npx to ensure local nx is used
npx nx run-many --target=lint --all

echo "Running Tests..."
npx nx run-many --target=test --all

echo "Running Policy Validation..."
./tools/validate-policies.sh

echo "Running Dependency Graph Check..."
# depcruise should be available via npx or npm run
npm run dep-graph:check

echo "Verification Complete!"
