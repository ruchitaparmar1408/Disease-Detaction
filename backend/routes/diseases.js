import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import db from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + (file.originalname || 'image'))
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

// List all
router.get('/', (req, res) => {
  const diseases = db.prepare('SELECT * FROM diseases ORDER BY name').all();
  res.json({ diseases });
});

// Search diseases by text
router.get('/search', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();
  if (!q) {
    const all = db.prepare('SELECT * FROM diseases ORDER BY name').all();
    return res.json({ diseases: all });
  }
  const diseases = db.prepare(`
    SELECT * FROM diseases
    WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(symptoms) LIKE ?
    OR LOWER(category) LIKE ? OR LOWER(slug) LIKE ?
    ORDER BY name
  `).all(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
  res.json({ diseases });
});

// Get single disease by id or slug
router.get('/:idOrSlug', (req, res) => {
  const idOrSlug = req.params.idOrSlug;
  const byId = db.prepare('SELECT * FROM diseases WHERE id = ?').get(parseInt(idOrSlug, 10));
  const bySlug = db.prepare('SELECT * FROM diseases WHERE slug = ?').get(idOrSlug);
  const disease = byId || bySlug;
  if (!disease) return res.status(404).json({ error: 'Disease not found' });
  res.json(disease);
});

// Image-based search: upload image and get suggested diseases
// In production you would run an ML model here; we simulate by returning diseases by category or recent
router.post('/image-search', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file uploaded' });
  // Simulate image analysis: return diseases from multiple categories as "possible matches"
  const categories = ['skin', 'infectious', 'respiratory', 'eye'];
  const placeholders = db.prepare(`
    SELECT * FROM diseases WHERE category IN (${categories.map(() => '?').join(',')}) ORDER BY RANDOM() LIMIT 6
  `).all(...categories);
  // Clean up uploaded file after "analysis"
  fs.unlink(req.file.path, () => {});
  res.json({
    message: 'Image analyzed. Below are possible matching conditions—please verify with a healthcare provider.',
    diseases: placeholders
  });
});

export default router;
