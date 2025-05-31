const express = require('express');
const app = express();
const path = require('path');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Main landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API endpoint overview
app.use('/api', require('./api/index'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
