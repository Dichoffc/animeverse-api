// pages/api/index.js
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AnimeVerse API</title>
  <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet">
  <style>
    body { margin:0; font-family:'Rubik',sans-serif; background:#0d0d0d; color:#fff; }
    header { padding:1rem; text-align:center; background:#111; font-size:1.5rem; color:#1abc9c; }
    .container { display:flex; }
    nav { width:220px; background:#111; min-height:calc(100vh - 60px); padding:1rem; }
    nav input { width:100%; padding:0.5rem; margin-bottom:1rem; border-radius:4px; border:none; }
    nav .category { margin:0.5rem 0; cursor:pointer; padding:0.4rem; border-radius:4px; }
    nav .category:hover, nav .category.active { background:#1abc9c; }
    main { flex:1; padding:1rem; }
    .card { background:#1c1c1c; padding:20px; margin-bottom:20px; border-radius:8px; }
    .card h2 { margin:0 0.5rem 0.5rem; color:#1abc9c; }
    .endpoint { font-family:monospace; background:#111; padding:0.5rem; border-radius:4px; overflow-x:auto; }
    .btn { display:inline-block; margin-top:0.5rem; background:#1abc9c; color:#fff; padding:0.5rem 1rem; text-decoration:none; border:none; cursor:pointer; border-radius:4px; }
    .btn:hover { background:#16a085; }
    footer { text-align:center; font-size:0.8rem; color:#888; padding:1rem; }
    pre.json-result {
      background: #111;
      color: #0f0;
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 4px;
      overflow-x: auto;
      max-height: 300px;
      font-size: 0.85rem;
    }
    input.url-input {
      margin-top: 0.5rem;
      width: 100%;
      padding: 0.4rem;
      background: #222;
      color: white;
      border: none;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <header>AnimeVerse API</header>
  <div class="container">
    <nav>
      <input type="text" id="search" placeholder="Cari endpoint..." oninput="filterCategories()" />
      <div class="category active" onclick="selectCat('all')">Semua Kategori</div>
      <div class="category" onclick="selectCat('Downloader')">Downloader</div>
      <div class="category" onclick="selectCat('Tools')">Tools</div>
      <div class="category" onclick="selectCat('AI')">AI</div>
      <div class="category" onclick="selectCat('Audio')">Audio</div>
    </nav>
    <main id="main">
      <!-- Downloader -->
      <div class="card" data-cat="Downloader">
        <h2>Instagram Downloader</h2>
        <div class="endpoint">/api/download/instagram?url=</div>
        <input type="text" placeholder="Paste URL Instagram..." class="url-input" data-endpoint="/api/download/instagram" />
        <button class="btn" onclick="tryEndpoint(this)">Coba</button>
        <pre class="json-result"></pre>
      </div>
      <div class="card" data-cat="Downloader">
        <h2>TikTok Downloader</h2>
        <div class="endpoint">/api/download/tiktok?url=</div>
        <input type="text" placeholder="Paste URL TikTok..." class="url-input" data-endpoint="/api/download/tiktok" />
        <button class="btn" onclick="tryEndpoint(this)">Coba</button>
        <pre class="json-result"></pre>
      </div>
      <div class="card" data-cat="Downloader">
        <h2>Spotify Downloader</h2>
        <div class="endpoint">/api/download/spotify?url=</div>
        <input type="text" placeholder="Paste URL Spotify..." class="url-input" data-endpoint="/api/download/spotify" />
        <button class="btn" onclick="tryEndpoint(this)">Coba</button>
        <pre class="json-result"></pre>
      </div>

      <!-- Tools -->
      <div class="card" data-cat="Tools">
        <h2>Base64 Encode</h2>
        <div class="endpoint">/api/tools/base64</div>
        <button class="btn" onclick="tryEndpoint(this)">Coba</button>
        <pre class="json-result"></pre>
      </div>
      <div class="card" data-cat="Tools">
        <h2>Enhancer HD</h2>
        <div class="endpoint">/api/tools/enhancer</div>
        <button class="btn" onclick="tryEndpoint(this)">Coba</button>
        <pre class="json-result"></pre>
      </div>

      <!-- AI -->
      <div class="card" data-cat="AI">
        <h2>Chat AI</h2>
        <div class="endpoint">/api/ai/chat</div>
        <button class="btn" onclick="tryEndpoint(this)">Coba</button>
        <pre class="json-result"></pre>
      </div>
    </main>
  </div>
  <footer>© 2025 - AnimeVerse API | Created by Dichxploit</footer>
  <script>
    function selectCat(cat){
      document.querySelectorAll('.category').forEach(e=>e.classList.remove('active'));
      event.target.classList.add('active');
      filterCards();
    }

    function filterCards(){
      const cat = document.querySelector('.category.active').textContent;
      const search = document.getElementById('search').value.toLowerCase();
      document.querySelectorAll('.card').forEach(card => {
        const title = card.querySelector('h2').textContent.toLowerCase();
        const matchCat = (cat==='Semua Kategori'|| card.dataset.cat === cat);
        const matchSearch = title.includes(search);
        card.style.display = matchCat && matchSearch ? '' : 'none';
      });
    }

    async function tryEndpoint(btn) {
      const card = btn.closest('.card');
      const input = card.querySelector('.url-input');
      const pre = card.querySelector('.json-result');
      let url = input ? input.dataset.endpoint + '?url=' + encodeURIComponent(input.value) : card.querySelector('.endpoint').textContent;

      pre.textContent = 'Loading...';

      try {
        const res = await fetch(url);
        const data = await res.json();
        pre.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        pre.textContent = 'Error: ' + err.message;
      }
    }
  </script>
</body>
</html>`);
}
