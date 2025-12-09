# STEM Mentorship Portal

A collaborative platform for STEM students to find mentors and peers.

## 🚀 Quick Start Setup

### Prerequisites
- Docker Desktop (running)
- Git

### Setup & Run (5 minutes)

1. **Build Docker Containers** (first time only):
    ```powershell
    docker compose build
    ```
    This builds the Laravel and Frontend container images.

2. **Start Docker Containers**:
    ```powershell
    docker compose up -d
    ```
    This starts:
    - Laravel API (port 8080)
    - Frontend (port 3005)
    - PostgreSQL Database
    - Redis Cache
    - Mailpit (email testing)

3. **Migrate Database Schema**:
    ```powershell
    docker compose exec laravel.test php artisan migrate
    ```
    This creates all database tables.

4. **Seed Sample Data** (optional but recommended):
    ```powershell
    docker compose exec laravel.test php artisan db:seed
    ```
    This populates the database with test users and sample data.

5. **Access the Application**:
    - **Frontend**: [http://localhost:3005](http://localhost:3005)
    - **API**: [http://localhost:8080/api](http://localhost:8080/api)
    - **Mailpit (emails)**: [http://localhost:8025](http://localhost:8025)

### Useful Docker Commands

```powershell
# View running containers
docker compose ps

# View logs
docker compose logs -f laravel.test    # API logs
docker compose logs -f frontend        # Frontend logs

# Stop all containers
docker compose down

# Stop & remove all data (fresh start)
docker compose down -v

# Run artisan commands
docker compose exec laravel.test php artisan <command>

# Access container shell
docker compose exec laravel.test bash
```

---

## Tech Stack
- **Backend**: Laravel 11 + Laravel Sanctum (API Authentication)
- **Frontend**: React 18 + Vite
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS v4
- **Infrastructure**: Docker (Laravel Sail)

## Getting Started

### Prerequisites
- Docker Desktop (running)
- Node.js & NPM

### Installation & Running

1. **Start Docker containers**:
    ```bash
    docker compose up -d
    ```

2. **Install Frontend Dependencies** (if not done):
    ```bash
    npm install
    ```

3. **Run Frontend Development Server**:
    ```bash
    npm run dev
    ```

4. **Access the App**:
    - **Main App**: [http://localhost](http://localhost) ← **USE THIS**
    - Vite Dev Server: http://localhost:5173 (for HMR only)

## Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend (React App)** | `http://localhost` | Main application |
| **API Endpoints** | `http://localhost/api/*` | Backend API |
| **Mailpit (Email Testing)** | `http://localhost:8025` | View test emails |
| Vite HMR | `http://localhost:5173` | Hot reload (dev only) |

## Project Structure
- `app/`: Laravel Backend Logic
  - `Models/`: User, Profile
  - `Http/Controllers/`: AuthController
- `resources/js/`: React Frontend Application
  - `components/`: Button, Input
  - `pages/`: Login, Register
  - `services/`: API client
  - `Main.jsx`: App entry point
- `routes/`: API and Web routes
- `database/migrations/`: Database schema

## Features Implemented

✅ User Authentication (Register/Login)
✅ User Profiles (Student/Mentor roles)
✅ PostgreSQL Database
✅ API Authentication (Laravel Sanctum)
✅ Beautiful gradient UI

## Next Features

🚧 Dashboard
🚧 Tinder-style Matchmaking
🚧 Profile Editing
🚧 Project Boards
🚧 Discussion Forums
🚧 Real-time Chat

