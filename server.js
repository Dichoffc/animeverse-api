// server.js (untuk lokal development / Express) import express from 'express'; import cors from 'cors'; import path from 'path'; import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename);

const app = express(); const PORT = process.env.PORT || 3000;

app.use(cors()); app.use(express.json()); app.use(express.static(path.join(__dirname, 'public')));

// API endpoint app.get('/api', (req, res) => { res.status(200).json({ status: true, message: "Welcome to AnimeVerse API", endpoints: { download: "/api/download", tools: "/api/tools", ai: "/api/ai" } }); });

// Start server app.listen(PORT, () => { console.log(Server running at http://localhost:${PORT}); });

