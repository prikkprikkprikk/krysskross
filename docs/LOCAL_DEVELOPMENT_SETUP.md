# Local Development Setup with Laravel Valet

This document describes how to set up and run KryssKross locally using Laravel Valet for the backend and Vite dev server for the frontend.

## Architecture Overview

**Development:**
- Backend (Laravel + Filament): `http://krysskross.test` (via Valet)
- Frontend (React): `http://localhost:5173` (via Vite dev server with proxy)
- Admin panel: `http://krysskross.test/admin`
- API: `http://krysskross.test/api/*`

**Production:**
- Everything served from single domain: `krysskross.net`
- React app built into `backend/public/dist`
- Frontend: `krysskross.net`
- Admin: `krysskross.net/admin`
- API: `krysskross.net/api/*`

## Prerequisites

- PHP 8.4+
- Composer
- Node.js 18+
- Laravel Valet installed and configured
- SQLite (or your preferred database)

## Initial Setup

### 1. Backend Setup

```bash
cd backend

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create SQLite database
touch database/database.sqlite

# Run migrations
php artisan migrate

# Link with Valet (MUST be run from backend directory!)
valet link krysskross

# Optional: Enable HTTPS
valet secure krysskross
```

**Important:** The `valet link` command must be run from the `backend` directory, not the project root. This is because Laravel expects to serve from the directory containing the `public` folder.

Your backend is now available at `https://krysskross.test` (or `http://` if not secured)

### 2. Frontend Setup

```bash
cd frontend

# Install Node dependencies
npm install
```

### 3. Environment Configuration

Update `backend/.env`:

```env
APP_NAME=KryssKross
APP_ENV=local
APP_URL=https://krysskross.test  # Use https if you ran valet secure
```

## Running in Development Mode

### Option 1: Unified Command (Recommended)

From the `backend` directory:

```bash
composer dev
```

This runs:
- Laravel dev server
- Queue worker
- Pail (log viewer)
- Vite dev server (frontend)

**Note:** With Valet, you don't need the Laravel dev server. You can access the app via Valet at `http://krysskross.test` while the Vite dev server runs at `http://localhost:5173`.

### Option 2: Separate Processes

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

Frontend available at `http://localhost:5173`
- Automatically proxies `/api` and `/admin` requests to `http://krysskross.test`
- Hot module reloading enabled

**Backend is already running via Valet:**
- Visit `http://krysskross.test/admin` for Filament admin
- API available at `http://krysskross.test/api/*`

## How It Works

### Development Mode

1. **Frontend (`localhost:5173`)**: Vite serves the React app with HMR
2. **API Requests**: Vite proxy forwards `/api/*` calls to `krysskross.test`
3. **Admin Access**: Vite proxy forwards `/admin` to `krysskross.test`
4. **Hot Reload**: Changes to React code reload instantly

The `app.blade.php` template detects development mode (via `public/hot` file created by Vite) and loads assets from `http://localhost:5173`.

### Production Mode

1. Build frontend: `cd frontend && npm run build`
2. Frontend assets compiled to `backend/public/dist/`
3. `app.blade.php` reads manifest and loads built assets
4. Laravel catch-all route serves React for frontend routes
5. Filament and API routes remain accessible at `/admin` and `/api`

## URL Structure

### Development

| URL | Serves | Source |
|-----|--------|--------|
| `localhost:5173` | React app (dev) | Vite dev server |
| `localhost:5173/api/*` | API endpoints | Proxied to Valet |
| `krysskross.test` | React app (via Laravel) | Valet |
| `krysskross.test/admin` | Filament admin | Valet |
| `krysskross.test/api/*` | API endpoints | Valet |

### Production

| URL | Serves | Source |
|-----|--------|--------|
| `krysskross.net` | React app | Built assets in `public/dist` |
| `krysskross.net/admin` | Filament admin | Laravel route |
| `krysskross.net/api/*` | API endpoints | Laravel API routes |

## Building for Production

```bash
cd frontend
npm run build
```

This:
1. Compiles React app with TypeScript
2. Outputs to `backend/public/dist/`
3. Creates manifest file for Laravel to read
4. Optimizes and minifies assets

Test production build locally:
1. Build frontend: `npm run build`
2. Create `backend/public/hot` file to disable dev mode
3. Visit `http://krysskross.test`

## Common Tasks

### Access Filament Admin

```bash
# Create admin user
cd backend
php artisan make:filament-user
```

Then visit: `http://krysskross.test/admin`

### Run Migrations

```bash
cd backend
php artisan migrate
```

### Clear Caches

```bash
cd backend
php artisan optimize:clear
```

### View Logs

```bash
cd backend
php artisan pail
```

## Troubleshooting

### "404 Not Found" when visiting krysskross.test

This usually means Valet was linked from the wrong directory. **You must link from the `backend` directory**, not the project root:

```bash
# Fix it:
cd ~/code/krysskross
valet unlink  # If linked from root
valet unsecure  # If secured from root

cd backend
valet link krysskross
valet secure krysskross  # Optional, for HTTPS
```

### Frontend can't reach API

- Verify Valet is running: `valet status`
- Check proxy configuration in `frontend/vite.config.ts`
- Ensure `krysskross.test` resolves: `ping krysskross.test`
- If using HTTPS, update proxy to use `https://krysskross.test`

### "404 Not Found" on frontend routes (after root loads)

- Check `backend/routes/web.php` has catch-all route
- Verify route excludes `/api` and `/admin` paths

### Production build not loading

- Ensure assets built: `ls backend/public/dist/`
- Check manifest exists: `ls backend/public/dist/.vite/manifest.json`
- Remove `backend/public/hot` file to disable dev mode

### CORS errors

- Shouldn't happen with this setup (same-origin in production, proxy in dev)
- If using separate domains in production, configure CORS in Laravel

## Project Structure

```
krysskross/
├── backend/
│   ├── app/
│   ├── routes/
│   │   └── web.php          # Catch-all route for React
│   ├── resources/
│   │   └── views/
│   │       └── app.blade.php # Entry point template
│   ├── public/
│   │   ├── dist/            # Built frontend assets (gitignored)
│   │   └── hot              # Dev mode indicator (auto-created by Vite)
│   └── vite.config.js       # Laravel Vite config (for Filament)
└── frontend/
    ├── src/
    │   └── main.tsx         # React entry point
    ├── vite.config.ts       # Frontend Vite config with proxy
    └── package.json
```

## Deployment Notes

For production deployment:

1. **Single Server Deployment:**
   - Build frontend: `npm run build` (in CI/CD)
   - Deploy `backend/` directory (includes built assets in `public/dist/`)
   - Configure web server to point to `backend/public/`

2. **Environment Variables:**
   - Set `APP_ENV=production` in `.env`
   - Set correct `APP_URL`
   - Configure database credentials

3. **Post-Deployment:**
   ```bash
   php artisan migrate --force
   php artisan optimize
   ```

## Additional Resources

- [Laravel Valet Documentation](https://laravel.com/docs/valet)
- [Vite Proxy Configuration](https://vitejs.dev/config/server-options.html#server-proxy)
- [Filament Documentation](https://filamentphp.com/docs)
