const express = require('express');
const cors = require('cors');
const path = require('path');

const { getAnimeUpdates } = require('./utils/anime');
const { downloadMedia } = require('./utils/downloader');
const { enhanceImage, removeBg } = require('./utils/tools');
const { tanyaAI } = require('./utils/ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// =================== ROUTES ===================

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 🔄 Anime Update
app.get('/api/anime', async (req, res) => {
  try {
    const data = await getAnimeUpdates();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil data anime' });
  }
});

// ⬇️ Downloader (TikTok, IG, YouTube, dll)
app.get('/api/download', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL wajib diisi' });

  try {
    const result = await downloadMedia(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Gagal download media' });
  }
});

// 🧠 Tanya AI
app.post('/api/ai', async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: 'Pertanyaan kosong' });

  try {
    const answer = await tanyaAI(question);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menjawab pertanyaan' });
  }
});

// ✨ Enhance / HD-kan gambar
app.post('/api/enhance', async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) return res.status(400).json({ error: 'URL gambar kosong' });

  try {
    const result = await enhanceImage(imageUrl);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Gagal enhance gambar' });
  }
});

// ❌ Remove Background
app.post('/api/removebg', async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) return res.status(400).json({ error: 'URL gambar kosong' });

  try {
    const result = await removeBg(imageUrl);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Gagal hapus background' });
  }
});

// =================== START SERVER ===================
app.listen(PORT, () => {
  console.log(`✅ Server ready at http://localhost:${PORT}`);
});
