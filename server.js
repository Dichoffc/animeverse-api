const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Endpoint utama /api
app.get('/api', (req, res) => {
  res.json({
    status: true,
    creator: "AnimeVerse",
    message: "Welcome to AnimeVerse API!",
    endpoints: {
      anime: "/api/anime",
      downloader: {
        youtube: "/api/download/youtube?url=",
        tiktok: "/api/download/tiktok?url=",
        instagram: "/api/download/instagram?url="
      },
      tools: {
        removebg: "/api/tools/removebg?image_url=",
        hd: "/api/tools/upscale?image_url="
      },
      ai: "/api/ai?ask=siapa+kamu"
    }
  });
});

// Anime update (dummy)
app.get('/api/anime', (req, res) => {
  res.json({
    status: true,
    anime: [
      { title: "Jujutsu Kaisen S2", status: "Ongoing" },
      { title: "One Piece", status: "Weekly" },
      { title: "Solo Leveling", status: "Finished" }
    ]
  });
});

// Downloader endpoints
app.get('/api/download/youtube', (req, res) => {
  const url = req.query.url;
  res.json({ status: true, message: `YouTube downloader triggered for ${url}` });
});

app.get('/api/download/tiktok', (req, res) => {
  const url = req.query.url;
  res.json({ status: true, message: `TikTok downloader triggered for ${url}` });
});

app.get('/api/download/instagram', (req, res) => {
  const url = req.query.url;
  res.json({ status: true, message: `Instagram downloader triggered for ${url}` });
});

// Tools
app.get('/api/tools/removebg', (req, res) => {
  const imageUrl = req.query.image_url;
  res.json({ status: true, message: `Remove BG for image: ${imageUrl}` });
});

app.get('/api/tools/upscale', (req, res) => {
  const imageUrl = req.query.image_url;
  res.json({ status: true, message: `HD Upscale for image: ${imageUrl}` });
});

// AI Chat
app.get('/api/ai', (req, res) => {
  const ask = req.query.ask || "Tidak ada pertanyaan";
  res.json({ status: true, answer: `Kamu bertanya: "${ask}", jawaban dummy: Saya adalah AI bot dari AnimeVerse.` });
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
