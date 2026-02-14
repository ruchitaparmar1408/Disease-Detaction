# Disease Detection App

A full-stack app to search diseases by name or by image. Includes sign in, sign up, dashboard with symptoms, treatment, cure, and prevention info, plus image-based search.

## Stack

- **Backend**: Node.js, Express, SQLite (better-sqlite3), JWT auth, Multer for image uploads
- **Frontend**: React (Vite), React Router, CSS

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env   # edit .env if needed
npm run seed            # seed disease database
npm run dev             # start server on http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
npm run dev             # start on http://localhost:3000, proxies /api to backend
```

Use **http://localhost:3000** in the browser. Create an account, sign in, then use the dashboard to search by text or upload an image.

## Features

- **Auth**: Sign up, sign in, sign out
- **Dashboard**: Search diseases by name/keyword; view list with image and short description
- **Disease detail**: Full info — symptoms, causes, treatment, prevention, image
- **Search by image**: Upload a photo; get suggested matching diseases (backend returns placeholder matches; you can plug in a real ML model later)

## API

- `POST /api/auth/signup` — body: `{ email, password, name }`
- `POST /api/auth/login` — body: `{ email, password }`
- `GET /api/auth/me` — header: `Authorization: Bearer <token>`
- `GET /api/diseases` — list all
- `GET /api/diseases/search?q=` — search by text
- `GET /api/diseases/:idOrSlug` — single disease
- `POST /api/diseases/image-search` — form field `image` (file); returns suggested diseases

## Notes

- Image search currently returns simulated results. For real image-based disease detection, integrate a trained model (e.g. TensorFlow.js or a Python service) and call it from the `/api/diseases/image-search` handler.
- Disease images use placeholder URLs (Unsplash). Replace with your own or a medical image API if needed.
