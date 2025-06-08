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
    .btn { display:inline-block; margin-top:0.5rem; background:#1abc9c; color:#fff; padding:0.5rem 1rem; text-decoration:none; border-radius:4px; }
    .btn:hover { background:#16a085; }
    footer { text-align:center; font-size:0.8rem; color:#888; padding:1rem; }
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
      <!-- downloader -->
      <div class="card" data-cat="Downloader"><h2>Instagram Downloader</h2>
        <div class="endpoint">/api/download/instagram?url=</div>
        <a class="btn" href="/api/download/instagram?url=" target="_blank">Coba</a>
      </div>
      <div class="card" data-cat="Downloader"><h2>TikTok Downloader</h2>
        <div class="endpoint">/api/download/tiktok?url=</div>
        <a class="btn" href="/api/download/tiktok?url=" target="_blank">Coba</a>
      </div>
      <!-- tools -->
      <div class="card" data-cat="Tools"><h2>Base64 Encode</h2>
        <div class="endpoint">/api/tools/base64</div>
        <a class="btn" href="/api/tools/base64" target="_blank">Coba</a>
      </div>
      <div class="card" data-cat="Tools"><h2>Enhancer HD</h2>
        <div class="endpoint">/api/tools/enhancer</div>
        <a class="btn" href="/api/tools/enhancer" target="_blank">Coba</a>
      </div>
      <!-- ai -->
      <div class="card" data-cat="AI"><h2>Chat AI</h2>
        <div class="endpoint">/api/ai/chat</div>
        <a class="btn" href="/api/ai/chat" target="_blank">Coba</a>
      </div>
      <!-- audio -->
      <div class="card" data-cat="Audio"><h2>Spotify Downloader</h2>
        <div class="endpoint">/api/download/spotify?url=</div>
        <a class="btn" href="/api/download/spotify?url=" target="_blank">Coba</a>
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
  </script>
</body>
</html>`);
}
