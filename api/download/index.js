const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    Downloader: {
      TikTok: '/api/download/tiktok',
      Instagram: '/api/download/instagram',
      YouTube: '/api/download/youtube'
    }
  });
});

module.exports = router;
