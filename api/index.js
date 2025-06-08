export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AnimeVerse API</title>
  <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: #0d0d0d;
      color: #fff;
      font-family: 'Rubik', sans-serif;
      margin: 0;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #1abc9c;
      margin-bottom: 2rem;
    }
    .card {
      background-color: #1c1c1c;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 0 10px rgba(26,188,156,0.2);
    }
    .endpoint {
      background: #111;
      color: #0f0;
      padding: 10px;
      font-family: monospace;
      border-radius: 6px;
      overflow-x: auto;
    }
    .btn-row {
      margin-top: 10px;
    }
    .btn {
      background: #1abc9c;
      border: none;
      padding: 0.5rem 1rem;
      color: #fff;
      border-radius: 8px;
      text-decoration: none;
      margin-right: 0.5rem;
      cursor: pointer;
      box-shadow: 0 0 8px rgba(26,188,156,0.3);
      transition: 0.3s;
    }
    .btn:hover {
      background: #16a085;
    }
    footer {
      margin-top: 3rem;
      text-align: center;
      color: #888;
      font-size: 0.85rem;
    }
  </style>
</head>
<body>
  <h1>AnimeVerse API</h1>

  <div class="card">
    <h2>Instagram Downloader</h2>
    <div class="endpoint">/api/download/instagram?url=</div>
    <p>Download media dari Instagram tanpa API key.</p>
    <div class="btn-row">
      <a class="btn" href="/api/download/instagram?url=" target="_blank">Coba</a>
    </div>
  </div>

  <div class="card">
    <h2>TikTok Downloader</h2>
    <div class="endpoint">/api/download/tiktok?url=</div>
    <p>Download video TikTok tanpa watermark.</p>
    <div class="btn-row">
      <a class="btn" href="/api/download/tiktok?url=" target="_blank">Coba</a>
    </div>
  </div>

  <div class="card">
    <h2>Spotify Downloader</h2>
    <div class="endpoint">/api/download/spotify?url=</div>
    <p>Unduh lagu dari Spotify menggunakan URL.</p>
    <div class="btn-row">
      <a class="btn" href="/api/download/spotify?url=" target="_blank">Coba</a>
    </div>
  </div>

  <div class="card">
    <h2>SoundCloud Downloader</h2>
    <div class="endpoint">/api/download/soundcloud?url=</div>
    <p>Unduh audio dari SoundCloud menggunakan URL.</p>
    <div class="btn-row">
      <a class="btn" href="/api/download/soundcloud?url=" target="_blank">Coba</a>
    </div>
  </div>

  <div class="card">
    <h2>Instagram Post Generator</h2>
    <div class="endpoint">/api/v1/ig-post-generator</div>
    <p>Hasilkan gambar postingan Instagram palsu.</p>
    <div class="btn-row">
      <a class="btn" href="/api/v1/ig-post-generator" target="_blank">Coba</a>
    </div>
  </div>

  <footer>© 2025 - AnimeVerse API | Created by Dichxploit</footer>
</body>
</html>
`);
}
