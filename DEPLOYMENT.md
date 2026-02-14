# Deploy Disease Detection App (One Place)

This guide deploys **frontend + backend together** as a single app. The Node server serves the API and the built React app.

---

## Option 1: Render (recommended, free tier)

### 1. Push your code to GitHub

- Create a repo and push this project (including `package.json`, `render.yaml`, `backend/`, `frontend/`).

### 2. Create a Render account

- Go to [render.com](https://render.com) and sign up (GitHub login is easiest).

### 3. New Web Service from repo

- **Dashboard** → **New** → **Web Service**
- Connect your **GitHub** account if needed and select the **disease detection app** repository.
- Use these settings:

| Field | Value |
|-------|--------|
| **Name** | `disease-detection-app` (or any name) |
| **Region** | Choose closest to you |
| **Root Directory** | Leave **empty** (use repo root) |
| **Runtime** | **Node** |
| **Build Command** | `npm run build` |
| **Start Command** | `npm run start` |
| **Instance Type** | **Free** |

### 4. Environment variable (required for production)

- In the same screen, open **Environment** (or **Environment Variables**).
- Add:

| Key | Value |
|-----|--------|
| `NODE_ENV` | `production` |

- (Optional) Add `JWT_SECRET` with a long random string for production auth.

### 5. Deploy

- Click **Create Web Service**.
- Render will run `npm run build` (installs backend + frontend deps, builds frontend), then `npm run start` (starts the backend, which serves the built frontend).
- Wait for the build to finish. Your app will be at:  
  **`https://<your-service-name>.onrender.com`**

### 6. Seed the database (first time only)

- The app uses SQLite (sql.js). On Render, the filesystem is ephemeral, so the DB is empty until you seed it.
- **Option A – Seed via one-off job**
  - **Dashboard** → your service → **Shell** (or use a one-off job if available).
  - Run: `npm run seed`
- **Option B – Seed locally then redeploy** (not ideal for Render’s ephemeral disk)
  - Better: run seed from the app itself on first request, or use a **start command** that runs seed then start:
  - Change **Start Command** to: `cd backend && node seed.js && node server.js`
  - Redeploy once so the DB gets seeded; then you can change the start command back to `npm run start` if you prefer (next deploys will start with a fresh DB again on free tier).

**Simplest for free tier:** set **Start Command** to:

```bash
cd backend && node seed.js && node server.js
```

So every deploy (and every cold start) seeds the DB, then starts the server. Data won’t persist across deploys or long idle periods, but the app will work.

---

## Option 2: Railway

### 1. Push to GitHub (same as above)

### 2. Go to [railway.app](https://railway.app) and sign in with GitHub

### 3. New project from repo

- **New Project** → **Deploy from GitHub repo** → select your **disease detection app** repo.

### 4. Configure build and start

- Open the new service → **Settings** (or **Variables**).
- **Build Command:** `npm run build`
- **Start Command:** `npm run start`
- **Root Directory:** leave default (repo root).

### 5. Environment

- **Variables** tab:
  - `NODE_ENV` = `production`
  - (Optional) `JWT_SECRET` = your secret string.

### 6. Deploy and seed

- Railway will build and run. Your URL will be like:  
  **`https://<project>.up.railway.app`**
- To seed the DB once: **Settings** → run a one-off command, or use a custom start command:  
  `cd backend && node seed.js && node server.js`  
  (same idea as Render).

---

## Option 3: Run build + start locally (test production build)

```bash
# From repo root
npm run build
NODE_ENV=production npm run start
```

- Then open **http://localhost:4000** (frontend and API are both on this port).

On Windows PowerShell:

```powershell
$env:NODE_ENV="production"; npm run start
```

---

## Summary

| Step | Action |
|------|--------|
| 1 | Code is in GitHub (root `package.json`, `backend/`, `frontend/`, `render.yaml`). |
| 2 | Create Web Service on Render (or project on Railway). |
| 3 | **Build:** `npm run build` — **Start:** `npm run start` (or with seed: `cd backend && node seed.js && node server.js`). |
| 4 | Set `NODE_ENV=production` (and optional `JWT_SECRET`). |
| 5 | Deploy; open the given URL. |

Everything (API + React app) is served from **one URL** on one place (Render or Railway).
