import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';
import diseaseRoutes from './routes/diseases.js';
import { authMiddleware } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await initDb();

const app = express();
const PORT = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/diseases', diseaseRoutes);
app.get('/api/health', (req, res) => res.json({ ok: true }));

// In production: serve frontend build and SPA fallback (single deployment)
if (isProduction) {
  const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
  if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    app.get('*', (req, res) => {
      res.sendFile(path.join(frontendDist, 'index.html'));
    });
  }
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
