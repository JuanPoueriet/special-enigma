#!/bin/bash
set -e

echo "Installing dependencies (ignoring scripts to bypass node-gyp)..."
npm ci --ignore-scripts

echo "Running Lint..."
npx nx run-many --target=lint --all --parallel=3

echo "Running Tests..."
npx nx run-many --target=test --all --parallel=3 --skip-nx-cache

echo "Local verification complete!"
