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

echo "[1/4] Installing root dependencies..."
npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo "Error: Failed to install root dependencies"
    exit 1
fi

echo ""
echo "[2/4] Installing backend dependencies..."
cd apps/api
npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
    echo "Error: Failed to install backend dependencies"
    cd ../..
    exit 1
fi
cd ../..

echo ""
echo "[3/4] Starting Backend Server (NestJS)..."
echo "Backend starting in separate process..."
(cd apps/api && npm run start:dev) &
BACKEND_PID=$!
sleep 5

echo ""
echo "[4/4] Starting Frontend Server (Next.js)..."
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

cd apps/web
npm run dev

# Cleanup: kill backend when frontend stops
kill $BACKEND_PID 2>/dev/null

