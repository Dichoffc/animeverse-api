export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AnimeVerse API List</title>
      <style>
        body {
          font-family: 'Rubik', sans-serif;
          background: #0d0d0d;
          color: #fff;
          text-align: center;
          padding: 2rem;
        }

        h1 {
          color: #1abc9c;
          margin-bottom: 2rem;
          text-shadow: 0 0 10px #16a085;
        }

        .section {
          margin-bottom: 2.5rem;
        }

        .section h2 {
          color: #1abc9c;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .btn-list {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .btn {
          background: #1abc9c;
          border: none;
          padding: 0.9rem 1.5rem;
          font-size: 1rem;
          color: #fff;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 0 12px rgba(26, 188, 156, 0.5);
          transition: 0.3s;
        }

        .btn:hover {
          background: #16a085;
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(22, 160, 133, 0.8);
        }

        footer {
          margin-top: 3rem;
          color: #888;
          font-size: 0.9rem;
        }
      </style>
    </head>
    <body>
      <h1>AnimeVerse API</h1>

      <div class="section">
        <h2>Download</h2>
        <div class="btn-list">
          <a href="/api/download/tiktok" class="btn">TikTok</a>
          <a href="/api/download/instagram" class="btn">Instagram</a>
        </div>
      </div>

      <div class="section">
        <h2>Tools</h2>
        <div class="btn-list">
          <a href="/api/tools/base64" class="btn">Base64 Encode</a>
        </div>
      </div>

      <div class="section">
        <h2>AI</h2>
        <div class="btn-list">
          <a href="/api/ai/chat" class="btn">Chat AI</a>
        </div>
      </div>

      <footer>© 2025 - AnimeVerse API</footer>
    </body>
    </html>
  `);
}
