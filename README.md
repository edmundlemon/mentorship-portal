# STEM Mentorship Portal

A collaborative platform for STEM students to find mentors and peers.

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

