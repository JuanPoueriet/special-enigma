#!/bin/bash
# set -e  <-- Disabled to allow running all checks even if one fails

echo "========================================================"
echo "   VIRTEEX LOCAL VERIFICATION SCRIPT"
echo "========================================================"
echo "Use this script to verify your changes when CI is unavailable."
echo ""

echo "[1/3] Installing dependencies..."
# Using --legacy-peer-deps or similar if needed, but standard install for now
if [ -f "package-lock.json" ]; then
  npm ci --ignore-scripts
else
  npm install --ignore-scripts
fi

echo ""
echo "[2/3] Running Linting..."
npm run lint
LINT_STATUS=$?

echo ""
echo "[3/3] Running Tests..."
npm run test
TEST_STATUS=$?

echo ""
echo "========================================================"
if [ $LINT_STATUS -eq 0 ] && [ $TEST_STATUS -eq 0 ]; then
  echo "   ✅ VERIFICATION COMPLETE - ALL CHECKS PASSED"
else
  echo "   ❌ VERIFICATION FAILED"
  echo "   Lint Status: $LINT_STATUS"
  echo "   Test Status: $TEST_STATUS"
  exit 1
fi
echo "========================================================"
