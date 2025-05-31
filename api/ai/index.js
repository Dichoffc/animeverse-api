const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    category: 'AI',
    endpoints: {
      chatbot: '/api/ai/chatbot',
      imagegen: '/api/ai/imagegen',
    },
  });
});

module.exports = router;
