#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="twain-cert-console"

if [ -d "$PROJECT_DIR" ]; then
  echo "Using existing $PROJECT_DIR"
else
  echo "Unzipping project archive (if running from zip)..."
fi

echo "Installing dependencies..."
npm install

echo "Starting dev server..."
npm run dev