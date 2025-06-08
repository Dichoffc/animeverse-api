// pages/api/index.js 
export default function handler(req, res) { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.status(200).send(`<!DOCTYPE html><html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AnimeVerse API</title>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Rubik', sans-serif;
      background-color: #0e0e0e;
      color: #e0e0e0;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    header {
      background-color: #1f1f1f;
      padding: 1rem 2rem;
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      color: #00d2ff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .container {
      display: flex;
      flex: 1;
    }
    nav {
      width: 260px;
      background-color: #1a1a1a;
      padding: 1.5rem;
      border-right: 1px solid #2e2e2e;
    }
    nav input {
      width: 100%;
      padding: 0.5rem;
      border-radius: 6px;
      border: none;
      background: #2b2b2b;
      color: #fff;
      margin-bottom: 1rem;
    }
    nav .category {
      background: #2a2a2a;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }
    nav .category:hover, nav .category.active {
      background: #00d2ff;
      color: #000;
      font-weight: 500;
    }
    main {
      flex: 1;
      padding: 2rem;
      overflow: auto;
    }
    .card {
      background: #1f1f1f;
      border: 1px solid #2d2d2d;
      border-radius: 10px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    .card h2 {
      margin-top: 0;
      color: #00d2ff;
    }
    .endpoint {
      font-family: monospace;
      background: #2c2c2c;
      padding: 0.75rem;
      border-radius: 6px;
      margin: 0.5rem 0;
      overflow-x: auto;
      white-space: nowrap;
    }
    .btn-group {
      display: flex;
      gap: 1rem;
    }
    .btn {
      background-color: #00d2ff;
      color: #000;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
      text-decoration: none;
    }
    .btn:hover {
      background-color: #00a8cc;
    }
    footer {
      background-color: #1f1f1f;
      text-align: center;
      font-size: 0.8rem;
      color: #888;
      padding: 1rem;
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
      <!-- downloader -->
      <div class="card" data-cat="Downloader">
        <h2>Instagram Downloader</h2>
        <div class="endpoint">/api/download/instagram?url=</div>
        <div class="btn-group">
          <a class="btn" href="/api/download/instagram?url=" target="_blank">Coba</a>
          <button class="btn" onclick="copyToClipboard('/api/download/instagram?url=')">Copy URL</button>
        </div>
      </div>
      <!-- tools -->
      <div class="card" data-cat="Tools">
        <h2>Base64 Encode</h2>
        <div class="endpoint">/api/tools/base64</div>
        <div class="btn-group">
          <a class="btn" href="/api/tools/base64" target="_blank">Coba</a>
          <button class="btn" onclick="copyToClipboard('/api/tools/base64')">Copy URL</button>
        </div>
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
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('URL berhasil disalin: ' + text);
      });
    }
  </script>
</body>
</html>`);
}
