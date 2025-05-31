const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to AnimeVerse API',
    endpoints: [
      { category: 'Download', path: '/api/download' },
      { category: 'Tools', path: '/api/tools' },
      { category: 'AI', path: '/api/ai' }
    ]
  });
});

// Subendpoint langsung di sini
router.get('/download', (req, res) => {
  res.json({
    category: 'Download',
    services: [
      { name: 'Tiktok Downloader', path: '/api/download/tiktok' },
      { name: 'Instagram Downloader', path: '/api/download/instagram' },
      { name: 'YouTube Downloader', path: '/api/download/youtube' }
    ]
  });
});

router.get('/tools', (req, res) => {
  res.json({
    category: 'Tools',
    services: [
      { name: 'Shortlink', path: '/api/tools/shortlink' },
      { name: 'Base64 Encode', path: '/api/tools/base64' }
    ]
  });
});

router.get('/ai', (req, res) => {
  res.json({
    category: 'AI',
    services: [
      { name: 'Chat AI', path: '/api/ai/chat' },
      { name: 'Image Generator', path: '/api/ai/image' }
    ]
  });
});

module.exports = router;
