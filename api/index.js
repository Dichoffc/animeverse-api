const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  // Load HTML interaktif
  res.sendFile(path.join(__dirname, '../public/api.html'));
});

module.exports = router;
