const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve landing page
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.use('/api', require('./api/index'));

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
