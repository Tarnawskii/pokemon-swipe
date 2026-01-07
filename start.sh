#!/bin/bash

# Pokemon Tinder Startup Script for macOS/Linux

echo ""
echo "===================================="
echo "  Pokemon Tinder - Starting App"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please download it from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

# Detect platform and architecture
OS=$(uname -s)
ARCH=$(uname -m)
echo "Detected platform: $OS $ARCH"
echo ""

echo "[1/3] Cleaning up previous builds..."
rm -rf node_modules apps/*/node_modules apps/*/.next package-lock.json apps/*/package-lock.json
echo "✓ Cleanup complete"

echo ""
echo "[2/3] Installing dependencies from workspace root..."
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi
echo "✓ Dependencies installed successfully"

echo ""
echo "[3/3] Starting servers..."
echo ""
echo "===================================="
echo "  Servers Running"
echo "===================================="
echo ""
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

npm run dev

# Cleanup: kill backend when frontend stops
kill $BACKEND_PID 2>/dev/null
