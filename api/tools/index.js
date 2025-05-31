const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    category: 'Tools',
    endpoints: {
      shortlink: '/api/tools/shortlink',
      qrcode: '/api/tools/qrcode',
    },
  });
});

module.exports = router;
