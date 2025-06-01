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
          cursor: pointer;
          box-shadow: 0 0 12px rgba(26, 188, 156, 0.5);
          transition: 0.3s;
        }
        .btn:hover {
          background: #16a085;
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(22, 160, 133, 0.8);
        }
        .form-popup {
          display: none;
          margin-top: 1rem;
          text-align: center;
        }
        input[type="text"], textarea {
          width: 300px;
          padding: 0.5rem 0.7rem;
          border-radius: 8px;
          border: none;
          font-size: 1rem;
          margin-right: 0.5rem;
        }
        textarea {
          resize: vertical;
        }
        .submit-btn {
          background: #16a085;
          border: none;
          padding: 0.55rem 1rem;
          color: white;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }
        .submit-btn:hover {
          background: #13a27a;
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
          <button class="btn" onclick="showForm('tiktok')">TikTok</button>
          <button class="btn" onclick="showForm('instagram')">Instagram</button>
          <button class="btn" onclick="showForm('twitter')">Twitter</button>
          <button class="btn" onclick="showForm('facebook')">Facebook</button>
          <button class="btn" onclick="showForm('youtube')">YouTube</button>
          <button class="btn" onclick="showForm('spotify')">Spotify</button>
        </div>
        <div id="form-container"></div>
      </div>

      <div class="section">
        <h2>Tools</h2>
        <div class="btn-list">
          <a href="/api/tools/base64" class="btn" target="_blank" rel="noopener noreferrer">Base64 Encode</a>
          <a href="/api/tools/enhancer" class="btn" target="_blank" rel="noopener noreferrer">Enhancer HD</a>
          <a href="/api/tools/encrypt" class="btn" target="_blank" rel="noopener noreferrer">Encrypt</a>
          <a href="/api/tools/decrypt" class="btn" target="_blank" rel="noopener noreferrer">Decrypt</a>
        </div>
      </div>

      <div class="section">
        <h2>AI</h2>
        <div class="btn-list">
          <button class="btn" onclick="showAIChat()">Chat AI</button>
        </div>
        <div id="ai-chat-container" style="margin-top: 1rem;"></div>
      </div>

      <footer>© 2025 - AnimeVerse API | Created by Dichxploit</footer>

      <script>
        function showForm(service) {
          const container = document.getElementById('form-container');
          container.innerHTML = \`
            <div class="form-popup" style="display:block;">
              <input type="text" id="input-url" placeholder="Masukkan URL \${service} disini..." />
              <button class="submit-btn" onclick="submitUrl('\${service}')">Download</button>
            </div>
          \`;
          document.getElementById('ai-chat-container').innerHTML = '';
        }

        function submitUrl(service) {
          const input = document.getElementById('input-url');
          const url = input.value.trim();
          if (!url) {
            alert('Masukkan URL dulu bre!');
            return;
          }
          window.location.href = \`/api/download/\${service}?url=\` + encodeURIComponent(url);
        }

        function showAIChat() {
          const container = document.getElementById('ai-chat-container');
          container.innerHTML = \`
            <div style="max-width: 400px; margin: 0 auto;">
              <textarea id="ai-prompt" rows="4" placeholder="Masukkan prompt AI (optional)"></textarea>
              <input type="text" id="ai-question" placeholder="Tanya sesuatu..." style="margin-top:0.5rem;" />
              <button class="submit-btn" style="margin-top:0.7rem; width: 100%;" onclick="askAI()">Kirim</button>
              <pre id="ai-response" style="background:#111; color:#0f0; padding:1rem; border-radius:8px; margin-top:1rem; height: 150px; overflow-y: auto;"></pre>
            </div>
          \`;
          document.getElementById('form-container').innerHTML = '';
        }

        async function askAI() {
          const prompt = document.getElementById('ai-prompt').value.trim();
          const question = document.getElementById('ai-question').value.trim();
          const responseBox = document.getElementById('ai-response');

          if (!question) {
            alert('Masukkan pertanyaan dulu bre!');
            return;
          }

          responseBox.textContent = 'Loading...';

          try {
            const res = await fetch('/api/ai/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt, question })
            });

            const data = await res.json();

            if (data.status) {
              responseBox.textContent = data.response;
            } else {
              responseBox.textContent = 'Error: ' + (data.message || 'Gagal mendapatkan respon AI');
            }
          } catch (error) {
            responseBox.textContent = 'Fetch error: ' + error.message;
          }
        }
      </script>
    </body>
    </html>
  `);
}
