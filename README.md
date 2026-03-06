# Abheepay - B2B FinTech Platform

Professional B2B FinTech solution for AEPS, DMT, BBPS, and other financial services with a hierarchical distribution model.

## Project Structure

The project is organized into a clean, modular architecture separating the Frontend and Backend concerns.

### 📁 Root Directory
- `/frontend`: React + Vite frontend application.
- `/backend`: Express.js + Prisma backend API.
- `README.md`: Project documentation.

### 💻 Frontend (`/frontend`)
- `src/admin`: Admin dashboard and management modules.
- `src/website`: Customer-facing portal (if applicable).
- `src/services`: Centralized API service layer (Axios/Fetch configurations).
- `src/components`: Shared UI components across the app.
- `src/constants`: Global constants and mock data for development.
- `src/assets`: Global styles, images, and branding assets.

### ⚙️ Backend (`/backend`)
- `app.js`: Express application setup and middleware configuration.
- `server.js`: Server entry point and listener.
- `config/`: Database (Prisma) and global configuration singletons.
- `routes/`: Modular API routes (Auth, User, Wallet, KYC, Services).
- `controllers/`: Business logic handlers for each route.
- `middleware/`: Authentication and RBAC (Role-Based Access Control) logic.
- `prisma/`: Database schema and migrations.

## Getting Started

### Backend Setup
1. `cd backend`
2. `npm install`
3. Configure `.env` with your `DATABASE_URL` and `JWT_SECRET`.
4. `npx prisma generate`
5. `npm run dev`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Architecture Highlights
- **Hierarchical RBAC:** Multi-level access control (Admin > SD > MD > Dist > Retailer).
- **Service Layer:** Abstracted API calls for better maintainability.
- **Singleton Database:** Optimized Prisma Client instantiation.
- **Atomic Design:** Component-based UI structure.
