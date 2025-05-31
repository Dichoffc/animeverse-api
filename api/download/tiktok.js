const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'success',
    platform: 'TikTok',
    example: {
      url: 'https://api.animeverse.xyz/api/download/tiktok?url=https://tiktok.com/video/abc123'
    }
  });
});

module.exports = router;
