const express = require('express');
const path = require('path');
const app = express();

// Import API routes
const downloadRoutes = require('./api/download');
const toolsRoutes = require('./api/tools');
const aiRoutes = require('./api/ai');
const othersRoutes = require('./api/others');

// Middleware untuk serve file HTML landing page
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint utama /api
app.get('/api', (req, res) => {
  res.json({
    status: true,
    message: 'Welcome to AnimeVerse API ✨',
    available_menu: ['download', 'tools', 'ai', 'others'],
    endpoints: {
      download: '/api/download',
      tools: '/api/tools',
      ai: '/api/ai',
      others: '/api/others'
    }
  });
});

// Route untuk setiap fitur
app.use('/api/download', downloadRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/others', othersRoutes);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
