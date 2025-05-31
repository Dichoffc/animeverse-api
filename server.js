const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware JSON parse (kalau nanti perlu API POST)
app.use(express.json());

// Static file untuk landing page utama (misal di folder public)
app.use('/', express.static(path.join(__dirname, 'public')));

// Static file khusus buat dokumentasi API di /api
app.use('/api', express.static(path.join(__dirname, 'public/api')));

// ---------------- API Endpoint --------------------

// Contoh endpoint update anime list
app.get('/api/anime', (req, res) => {
  // Contoh data response
  res.json({
    status: true,
    message: 'List anime terbaru',
    data: [
      { id: 1, title: 'One Piece', status: 'Ongoing' },
      { id: 2, title: 'Naruto', status: 'Completed' },
      // tambahkan anime lain sesuai data nyata
    ],
  });
});

// Contoh endpoint downloader YouTube
app.get('/api/download/youtube', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'Parameter url dibutuhkan' });
  
  // Placeholder: proses download disini, misal pakai youtube-dl atau API lain
  res.json({ status: true, message: `Download video YouTube dari ${videoUrl} sedang diproses.` });
});

// Contoh endpoint downloader TikTok tanpa watermark
app.get('/api/download/tiktok', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'Parameter url dibutuhkan' });

  // Placeholder proses TikTok download
  res.json({ status: true, message: `Download video TikTok dari ${videoUrl} tanpa watermark sedang diproses.` });
});

// Contoh endpoint downloader Instagram
app.get('/api/download/instagram', (req, res) => {
  const mediaUrl = req.query.url;
  if (!mediaUrl) return res.status(400).json({ error: 'Parameter url dibutuhkan' });

  // Placeholder proses download IG
  res.json({ status: true, message: `Download media Instagram dari ${mediaUrl} sedang diproses.` });
});

// Tools: Remove Background
app.get('/api/tools/removebg', (req, res) => {
  const imageUrl = req.query.image_url;
  if (!imageUrl) return res.status(400).json({ error: 'Parameter image_url dibutuhkan' });

  // Placeholder proses removebg
  res.json({ status: true, message: `Remove background gambar dari ${imageUrl} sedang diproses.` });
});

// Tools: Upscale HD
app.get('/api/tools/upscale', (req, res) => {
  const imageUrl = req.query.image_url;
  if (!imageUrl) return res.status(400).json({ error: 'Parameter image_url dibutuhkan' });

  // Placeholder proses upscale
  res.json({ status: true, message: `Upscale gambar dari ${imageUrl} sedang diproses.` });
});

// AI Tanya Jawab
app.get('/api/ai', (req, res) => {
  const question = req.query.ask;
  if (!question) return res.status(400).json({ error: 'Parameter ask dibutuhkan' });

  // Placeholder: proses AI tanya jawab
  res.json({ 
    status: true, 
    question: question, 
    answer: 'Ini adalah jawaban AI untuk pertanyaan kamu (placeholder).' 
  });
});

// Error handler sederhana
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan' });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server AnimeVerse berjalan di http://localhost:${PORT}`);
});
