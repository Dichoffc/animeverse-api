const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Static folder for landing page
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint API utama
app.use('/api', require('./api/index'));
app.use('/api/download', require('./api/download'));
app.use('/api/tools', require('./api/tools'));
app.use('/api/ai', require('./api/ai'));

// Catch-all (optional)
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
