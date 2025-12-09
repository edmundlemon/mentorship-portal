# Docker Setup Guide

This repository has been configured to run with Docker using separate frontend and backend services.

## Architecture

- **Frontend**: React + Vite application running on port **3005**
- **Backend**: Laravel API running on port **8080**
- **Database**: PostgreSQL on port 5434 (also MySQL on 3308 for compatibility)
- **Redis**: Port 6379
- **Mailpit**: SMTP (1025) and Dashboard (8025)

## Quick Start

### 1. Copy Environment Files

```bash
# Copy backend environment file
cp .env.example .env

# Copy frontend environment file
cd frontend
cp .env.example .env
cd ..
```

### 2. Build and Start Services

```bash
# Build all Docker containers
docker compose build

# Start all services in detached mode
docker compose up -d
```

### 3. Initialize the Application

```bash
# Generate Laravel application key
docker compose exec laravel.test php artisan key:generate

# Run database migrations
docker compose exec laravel.test php artisan migrate

# (Optional) Seed the database
docker compose exec laravel.test php artisan db:seed
```

### 4. Access the Application

- **Frontend**: http://localhost:3005
- **Backend API**: http://localhost:8080/api
- **Mailpit Dashboard**: http://localhost:8025

## Development Commands

### View Logs

```bash
# View all logs
docker compose logs -f

# View specific service logs
docker compose logs -f frontend
docker compose logs -f laravel.test
```

### Stop Services

```bash
# Stop all services
docker compose down

# Stop and remove volumes (WARNING: deletes database data)
docker compose down -v
```

### Restart Services

```bash
# Restart all services
docker compose restart

# Restart specific service
docker compose restart frontend
```

### Run Laravel Commands

```bash
# Run artisan commands
docker compose exec laravel.test php artisan <command>

# Run composer commands
docker compose exec laravel.test composer <command>

# Run tests
docker compose exec laravel.test php artisan test
```

### Run Frontend Commands

```bash
# Install frontend dependencies
docker compose exec frontend npm install

# Run frontend build
docker compose exec frontend npm run build
```

## Environment Variables

### Backend (.env)

Key environment variables:
- `APP_URL=http://localhost:8080` - Backend URL
- `FRONTEND_URL=http://localhost:3005` - Frontend URL for CORS
- `DB_CONNECTION=pgsql` - Database connection

### Frontend (frontend/.env)

Key environment variables:
- `VITE_API_URL=http://localhost:8080` - Backend API URL

## Troubleshooting

### Frontend can't connect to backend

1. Check CORS configuration in `config/cors.php`
2. Verify `FRONTEND_URL` is set correctly in backend `.env`
3. Check browser console for specific CORS errors

### Database connection issues

1. Ensure PostgreSQL is healthy: `docker compose ps`
2. Check database credentials in `.env`
3. Run migrations: `docker compose exec laravel.test php artisan migrate`

### Port conflicts

If ports are already in use, update the ports in `compose.yaml`:
- Frontend: Change `3005:3005` to `<new-port>:3005`
- Backend: Change `8080:80` to `<new-port>:80`

Then update the corresponding URLs in environment files.

## Production Deployment

For production, use the production target in the frontend Dockerfile:

```bash
# Build frontend for production
docker compose build --target production frontend
```

This will create an optimized nginx-served build of the frontend.
