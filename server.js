const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files dari folder public (index.html, style, dsb)
app.use(express.static(path.join(__dirname, 'public')));

// Routing API
const apiRoutes = require('./api/index');
app.use('/api', apiRoutes);

// Fallback jika route tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Mulai server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
