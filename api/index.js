const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'AnimeVerse API Root',
    endpoints: {
      download: '/api/download',
      tools: '/api/tools',
      ai: '/api/ai'
    }
  });
});

module.exports = router;
