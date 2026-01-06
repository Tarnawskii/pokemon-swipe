# Pokémon Tinder

A full-stack web application that lets you swipe through Pokémon, like/dislike them, and keep track of your favorites. Each Pokémon comes with a unique Chuck Norris joke!

## ⚡ Get Started in Seconds

### Fastest Way to Run

**Windows:**
```bash
start.bat
```

**macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

That's it! The script will install everything and start both servers automatically. 🚀

---

## 📋 Prerequisites

Before you start, make sure you have installed:

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **PostgreSQL** 14 or higher ([Download](https://www.postgresql.org/download/))
- **npm** or **yarn** (comes with Node.js)

## 🚀 Quick Start (Automated)

### Option A: Use the Startup Script (Recommended)

#### Windows:
```bash
start.bat
```

#### macOS/Linux:
```bash
chmod +x start.sh
./start.sh
```

This script will automatically:
1. Install all dependencies
2. Start the backend server
3. Start the frontend server
4. Open the app in your browser

---

## 🚀 Quick Start (Manual)

### 1. Clone/Extract the Project

```bash
cd pokemon-tiner
```

### 2. Install 

```bash
npm install --legacy-peer-deps
```

### 3. Create PostgreSQL Database

Open PostgreSQL and run:

```sql
CREATE DATABASE pokemon_tinder;
```

Or using command line:

```bash
createdb pokemon_tinder
```

### 4. Set Up Environment Variables

#### Create `.env.local` in root directory:

```bash
# apps/api/.env.local
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_postgres_password
DATABASE_NAME=pokemon_tinder
PORT=3001
NODE_ENV=development
JWT_SECRET=your_secret_key_change_in_production
BCRYPT_ROUNDS=10
```

#### Create `.env.local` in `apps/web` directory:

```bash
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 5. Install Backend Dependencies

```bash
cd apps/api
npm install --legacy-peer-deps
cd ../..
```

### 6. Start the Backend Server

Open a **new terminal** and run:

```bash
cd apps/api
npm run start:dev
```

You should see:
```
[Nest] 12345  - 01/06/2026, 10:00:00 AM   LOG [NestFactory] Nest application successfully started +123ms
```

The backend is now running on `http://localhost:3001`

### 7. Start the Frontend Server

Open **another new terminal** and run:

```bash
cd apps/web
npm run dev
```

You should see:
```
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
```

The frontend is now running on `http://localhost:3000`

### 8. Open in Browser

Navigate to: **http://localhost:3000**


