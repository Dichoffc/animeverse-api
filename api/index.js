const express = require('express');
const router = express.Router();

// Data menu utama dan sub-menu
const apiMenu = {
  download: [
    { name: 'TikTok Downloader', endpoint: '/api/download/tiktok' },
    { name: 'Instagram Downloader', endpoint: '/api/download/instagram' },
    { name: 'YouTube Downloader', endpoint: '/api/download/youtube' },
  ],
  tools: [
    { name: 'Image Resizer', endpoint: '/api/tools/imageresize' },
    { name: 'QR Code Generator', endpoint: '/api/tools/qrcode' },
  ],
  ai: [
    { name: 'Chatbot AI', endpoint: '/api/ai/chatbot' },
    { name: 'Image AI Generator', endpoint: '/api/ai/imagegen' },
  ],
};

// Endpoint utama /api → tampilkan menu utama
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AnimeVerse API',
    availableMenus: Object.keys(apiMenu),
    instructions: 'GET /api/:menu to see submenu, e.g. /api/download',
  });
});

// Endpoint untuk menu tertentu, misal /api/download, /api/tools, /api/ai
router.get('/:menu', (req, res) => {
  const menu = req.params.menu.toLowerCase();

  if (!apiMenu[menu]) {
    return res.status(404).json({ error: 'Menu not found' });
  }

  res.json({
    menu: menu,
    items: apiMenu[menu],
  });
});

module.exports = router;
