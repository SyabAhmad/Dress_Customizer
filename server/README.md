# Dress Customizer - Backend API

A Flask-based REST API backend for the Dress Customizer application, featuring user authentication, design management, and avatar customization with PostgreSQL database.

## Tech Stack

- **Framework**: Flask 3.0.0
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT (Flask-JWT-Extended)
- **Migrations**: Alembic
- **CORS**: Flask-CORS for cross-origin requests

## Project Structure

```
server/
├── app/
│   ├── __init__.py              # Flask app factory
│   ├── models.py                # SQLAlchemy models
│   └── routes/
│       ├── __init__.py
│       ├── auth.py              # Authentication endpoints
│       ├── users.py             # User management endpoints
│       ├── designs.py           # Design CRUD endpoints
│       └── avatars.py           # Avatar management endpoints
├── migrations/
│   ├── env.py                   # Alembic environment
│   ├── alembic.ini
│   ├── script.py.mako           # Migration template
│   └── versions/
│       └── 001_initial.py       # Initial schema migration
├── run.py                       # Application entry point
├── requirements.txt             # Python dependencies
├── .env.example                 # Environment variables template
├── DATABASE_SETUP.md            # Database setup guide
├── API.md                       # API documentation
└── README.md                    # This file
```

## Quick Start

### 1. Prerequisites

- Python 3.8+
- PostgreSQL 12+
- pip (Python package manager)

### 2. Setup Python Virtual Environment

```powershell
# Windows
python -m venv venv
.\venv\Scripts\Activate.ps1

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 4. Setup Database

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed PostgreSQL setup instructions.

### 5. Configure Environment

```powershell
# Copy example to .env
copy .env.example .env

# Edit .env with your settings (especially DATABASE_URL and JWT_SECRET_KEY)
```

### 6. Run Migrations

```powershell
flask db upgrade
```

### 7. Start Development Server

```powershell
python run.py
```

Server will start at `http://localhost:5000`

## API Documentation

Detailed API endpoints documentation is available in [API.md](API.md).

### Key Features:

- **Authentication**: JWT-based sign up/sign in
- **User Management**: Get/update profile, delete account
- **Design Management**: Create, read, update, delete dress designs
- **Avatar Management**: Store and update user avatar measurements
- **CORS Enabled**: Works seamlessly with frontend

## Environment Variables

Create a `.env` file in the server root with:

```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/dress_customizer

# JWT
JWT_SECRET_KEY=your-jwt-secret-key

# Server
PORT=5000
```

## Database Models

### Users

- id (UUID)
- email (unique)
- password_hash
- name
- created_at, updated_at
- Relationships: avatar (one-to-one), designs (one-to-many), chats (one-to-many)

### Avatars

- id (UUID)
- user_id (foreign key, unique)
- height, width, build, head (float measurements)
- created_at, updated_at

### Designs

- id (UUID)
- user_id (foreign key)
- name, prompt
- Design parameters: color, pattern, sleeve_length, neckline, train_length, texture, texture_intensity, skirt_volume
- svg (SVG markup), thumbnail (binary)
- created_at, updated_at

### Chats

- id (UUID)
- user_id (foreign key)
- title
- created_at, updated_at
- Relationships: messages (one-to-many)

### Messages

- id (UUID)
- chat_id (foreign key)
- role (user/assistant)
- content (text)
- created_at

## Common Tasks

### Create Initial Migration

```powershell
# Alembic creates migrations from model changes
flask db migrate -m "Add new field"

# Review the migration file in migrations/versions/
# Then upgrade:
flask db upgrade
```

### Reset Database

```powershell
# Downgrade all migrations
flask db downgrade base

# Or manually:
# 1. Drop database: psql -U postgres -c "DROP DATABASE dress_customizer;"
# 2. Recreate: psql -U postgres -c "CREATE DATABASE dress_customizer;"
# 3. Run upgrade: flask db upgrade
```

### Test an Endpoint

```powershell
# Health check
curl http://localhost:5000/api/health

# Sign up
curl -X POST http://localhost:5000/api/auth/signup `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"pass123","name":"Test User"}'

# Sign in
curl -X POST http://localhost:5000/api/auth/signin `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"pass123"}'
```

## Development Workflow

1. **Modify Models**: Edit `app/models.py`
2. **Create Migration**: `flask db migrate -m "Description"`
3. **Review Migration**: Check `migrations/versions/` for generated SQL
4. **Apply Migration**: `flask db upgrade`
5. **Test**: Run your application and test endpoints
6. **Commit**: Add migrations to version control

## Production Deployment

Before deploying to production:

1. Set `FLASK_ENV=production`
2. Generate strong `SECRET_KEY` and `JWT_SECRET_KEY`
3. Use environment variables for sensitive data
4. Run migrations: `flask db upgrade`
5. Use gunicorn or similar production WSGI server:
   ```powershell
   gunicorn run:app
   ```
6. Set up PostgreSQL with proper backups
7. Configure CORS to allow only your frontend domain
8. Enable HTTPS
9. Set up logging and monitoring

## Troubleshooting

### Database Connection Error

- Ensure PostgreSQL is running
- Verify DATABASE_URL in .env
- Check database exists: `psql -U postgres -l | grep dress_customizer`

### Migration Issues

- View current migration status: `flask db current`
- View migration history: `flask db history`
- View pending upgrades: `flask db upgrade --sql`

### JWT Token Issues

- Ensure Authorization header format: `Bearer <token>`
- Check JWT_SECRET_KEY matches between encode/decode
- Verify token hasn't expired (default 30 days)

## Contributing

When adding new features:

1. Create models in `app/models.py`
2. Create migration: `flask db migrate`
3. Create routes in `app/routes/`
4. Register routes in `app/__init__.py`
5. Update `API.md` documentation
6. Test all endpoints

## Security Considerations

- ✓ Passwords hashed with Werkzeug
- ✓ JWT authentication for protected routes
- ✓ CORS enabled
- ⚠️ TODO: Rate limiting
- ⚠️ TODO: Input validation & sanitization
- ⚠️ TODO: SQL injection prevention (SQLAlchemy helps)
- ⚠️ TODO: HTTPS enforcement in production
- ⚠️ TODO: Environment-specific configurations

## License

Part of the Dress Customizer project.

## Support

For issues or questions:

1. Check DATABASE_SETUP.md for setup help
2. Review API.md for endpoint details
3. Check error logs in console output
