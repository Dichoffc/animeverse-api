const express = require('express');
const router = express.Router();

// Subroute modules
router.use('/download', require('./download'));
router.use('/tools', require('./tools'));
router.use('/ai', require('./ai'));

// Endpoint list JSON
router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'AnimeVerse Public API',
    endpoints: {
      download: '/api/download',
      tools: '/api/tools',
      ai: '/api/ai',
    },
  });
});

module.exports = router;
