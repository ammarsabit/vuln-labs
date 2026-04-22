require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")

const authRoutes  = require('./routes/auth');
const userRoutes  = require('./routes/users');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors({
  origin: "*", 
  credentials: true
}));

// ── Middleware ────────────────────────────────
app.use(express.json());

// ── Routes ────────────────────────────────────
app.use('/api/auth',  authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// ── Health check ─────────────────────────────
app.get('/health', (_, res) => res.json({ status: 'ok' }));

// ── 404 handler ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

// ── Global error handler ─────────────────────
app.use((err, req, res, next) => {
  console.error('[unhandled]', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── DB + Server startup ───────────────────────
const PORT     = process.env.PORT     || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅  MongoDB connected:', MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀  Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌  MongoDB connection failed:', err.message);
    process.exit(1);
  });
