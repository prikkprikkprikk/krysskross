# How to Run KryssKross Locally

## Frontend (React + TypeScript + Vite)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

This will start the Vite development server, typically at http://localhost:5173

## Backend (Laravel)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install PHP dependencies (if not already done):
```bash
composer install
```

3. Set up your environment file (if not already done):
```bash
cp .env.example .env
php artisan key:generate
```

4. Run database migrations (if needed):
```bash
php artisan migrate
```

5. Start the Laravel development server:
```bash
php artisan serve
```

This will start the Laravel server, typically at http://localhost:8000

For full functionality, you'll need to run both the frontend and backend servers simultaneously, each in its own terminal window.
