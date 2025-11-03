# PostgreSQL Database Setup Instructions

This document provides instructions for setting up PostgreSQL database for the Dress Customizer application.

## Prerequisites

- PostgreSQL installed on your system
- `psql` command-line tool available

## Windows Setup

### 1. Start PostgreSQL Service

```powershell
# If PostgreSQL is installed and running as a service, it should auto-start
# If not, you can start it manually (depending on your installation)
# Typically: net start postgresql-x64-XX (where XX is the version)
```

### 2. Create Database

```powershell
# Open PowerShell and run:
psql -U postgres -c "CREATE DATABASE dress_customizer;"
```

If prompted for password, enter the password you set during PostgreSQL installation.

### 3. Verify Database Creation

```powershell
psql -U postgres -l | grep dress_customizer
```

You should see your database listed.

## macOS/Linux Setup

### 1. Start PostgreSQL Service

```bash
# macOS with Homebrew
brew services start postgresql

# Linux (Ubuntu/Debian)
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# As postgres user
sudo -u postgres psql -c "CREATE DATABASE dress_customizer;"

# Or if you have postgres user set up
psql -U postgres -c "CREATE DATABASE dress_customizer;"
```

### 3. Verify Database Creation

```bash
psql -U postgres -l | grep dress_customizer
```

## Configuration

### 1. Create `.env` File

Copy `.env.example` to `.env`:

```powershell
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

### 2. Update `.env` with Your Database Credentials

Edit `.env` and update the `DATABASE_URL`:

```
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/dress_customizer
```

Replace:

- `postgres` with your PostgreSQL username (if different)
- `your_password` with your PostgreSQL password
- `localhost` with your database host (if running remotely)
- `5432` with your PostgreSQL port (if different)

### 3. Update JWT Secret

```
JWT_SECRET_KEY=your-super-secret-jwt-key-change-in-production
```

## Running Migrations

After setting up the database and environment variables:

```powershell
# Activate your Python virtual environment first
# Then run migrations:

flask db upgrade
# or
python -m flask db upgrade
```

## Verifying Setup

To verify everything is set up correctly:

```powershell
# Start the Flask development server
python run.py

# You should see:
# * Running on http://127.0.0.1:5000

# Test the health endpoint
curl http://localhost:5000/api/health
# Should return: {"status":"ok"}
```

## Useful PostgreSQL Commands

```powershell
# Connect to the database
psql -U postgres -d dress_customizer

# List all databases
psql -U postgres -l

# Drop database (if needed for fresh start)
psql -U postgres -c "DROP DATABASE dress_customizer;"

# Reconnect and create fresh
psql -U postgres -c "CREATE DATABASE dress_customizer;"
```

## Troubleshooting

### Connection Refused

- Check PostgreSQL is running: `psql -U postgres -c "SELECT 1;"`
- Verify DATABASE_URL in .env matches your setup
- Check database host and port

### Permission Denied

- Verify PostgreSQL user exists
- Check user has CREATE DATABASE privileges
- Reset password if needed

### Database Already Exists

- Drop existing database: `psql -U postgres -c "DROP DATABASE dress_customizer;"`
- Then create new one

## Next Steps

1. Install Python dependencies: `pip install -r requirements.txt`
2. Run migrations: `flask db upgrade`
3. Start the server: `python run.py`
4. Connect frontend to `http://localhost:5000`
