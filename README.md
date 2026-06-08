# One More Restaurant 🍲 — React + Vite + Tailwind

Modern full-stack restaurant website built with **React + Vite + Tailwind CSS** frontend and **Node.js + Express + MongoDB** backend.

## Stack
- **Frontend**: React 18, Vite, Tailwind CSS 3, React Router v6, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express.js, MongoDB + Mongoose, JWT Auth

## Features
- 🏠 Animated hero with floating orbs and gradient mesh
- 🍽️ Menu page with category filter + cart
- 🛒 Slide-out cart drawer with order placement
- 📅 Reservation form with confirmation codes
- 📬 Contact form
- 👤 About page with stats
- 📱 Fully responsive, mobile-first
- 🌙 Dark luxury aesthetic (Cormorant Garamond + Outfit fonts)

## Quick Start

```bash
# 1. Install backend deps
cd backend && npm install

# 2. Configure environment
cp .env.example .env   # add your MONGODB_URI

# 3. Run backend
npm run dev   # → http://localhost:5000

# 4. In another terminal, run frontend
cd ../   # root of project
npm install && npm run dev   # → http://localhost:5173
```

## Build for Production
```bash
npm run build   # builds React into backend/public/
cd backend && npm start   # serves everything on port 5000
```

## Deploy to Render / Railway
1. Push to GitHub
2. New Web Service → root directory = `/backend`
3. Build command: `cd .. && npm install && npm run build`
4. Start command: `node server.js`
5. Set env vars: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`
