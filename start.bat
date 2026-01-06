@echo off
REM Pokemon Tinder Startup Script for Windows

echo.
echo ====================================
echo   Pokemon Tinder - Starting App
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    echo Please download it from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Installing root dependencies...
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo Error: Failed to install root dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing backend dependencies...
cd apps\api
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo Error: Failed to install backend dependencies
    cd ..\..
    pause
    exit /b 1
)
cd ..\..

echo.
echo [3/4] Starting Backend Server (NestJS)...
echo Opening new terminal for backend...
start cmd /k "cd apps\api && npm run start:dev"
timeout /t 5 /nobreak

echo.
echo [4/4] Starting Frontend Server (Next.js)...
cd apps\web
npm run dev

pause

