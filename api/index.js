// pages/api/index.js
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="id"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>AnimeVerse API</title>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet"/>
  <style>
    *{box-sizing:border-box;}
    body{margin:0;font-family:'Rubik',sans-serif;background:#0e0e0e;color:#e0e0e0;display:flex;flex-direction:column;min-height:100vh;}
    header{background:#1f1f1f;padding:1rem 2rem;font-size:2rem;font-weight:700;text-align:center;color:#00d2ff;box-shadow:0 2px 4px rgba(0,0,0,0.3);}
    .container{display:flex;flex:1;}
    nav{width:260px;background:#1a1a1a;padding:1.5rem;border-right:1px solid #2e2e2e;}
    nav input{width:100%;padding:0.5rem;border-radius:6px;border:none;background:#2b2b2b;color:#fff;margin-bottom:1rem;}
    nav .category{background:#2a2a2a;padding:0.5rem;margin-bottom:0.5rem;border-radius:6px;cursor:pointer;transition:background .2s;}
    nav .category:hover,nav .category.active{background:#00d2ff;color:#000;font-weight:500;}
    main{flex:1;padding:2rem;overflow:auto;}
    .card{background:#1f1f1f;border:1px solid #2d2d2d;border-radius:10px;padding:1.5rem;margin-bottom:1.5rem;box-shadow:0 2px 5px rgba(0,0,0,0.2);}
    .card h2{margin-top:0;color:#00d2ff;}
    .endpoint{font-family:monospace;background:#2c2c2c;padding:0.75rem;border-radius:6px;margin:0.5rem 0;overflow-x:auto;white-space:nowrap;}
    .input-url{width:100%;margin:0.5rem 0;padding:0.5rem;background:#2b2b2b;color:#fff;border-radius:6px;border:none;}
    .btn{background:#00d2ff;color:#000;padding:0.5rem 1rem;border:none;border-radius:6px;font-weight:500;cursor:pointer;transition:background .2s;text-decoration:none;}
    .btn:hover{background:#00a8cc;}
    .response{margin-top:1rem;background:#111;border-radius:6px;padding:1rem;font-family:monospace;white-space:pre-wrap;color:#fff;border:1px solid #2a2a2a;display:none;}
    .btn-group{display:flex;gap:0.5rem;flex-wrap:wrap;}
    footer{background:#1f1f1f;text-align:center;font-size:0.8rem;color:#888;padding:1rem;}
  </style>
</head><body>
  <header>AnimeVerse API</header>
  <div class="container">
    <nav>
      <input type="text" id="search" placeholder="Cari endpoint..." oninput="filterCategories()"/>
      <div class="category active" onclick="selectCat('all')">Semua</div>
      <div class="category" onclick="selectCat('Downloader')">Downloader</div>
      <div class="category" onclick="selectCat('Tools')">Tools</div>
      <div class="category" onclick="selectCat('AI')">AI</div>
      <div class="category" onclick="selectCat('Audio')">Audio</div>
    </nav>
    <main id="main">
      <!-- Downloader - Instagram -->
      <div class="card" data-cat="Downloader">
        <h2>Instagram Downloader</h2>
        <div class="endpoint">/api/download/instagram?url=</div>
        <input class="input-url" placeholder="Masukkan URL Instagram..." data-type="instagram"/>
        <div class="btn-group">
          <button class="btn" onclick="pasteToInput(this)">Paste Link</button>
          <button class="btn" onclick="fetchData(this)">Coba</button>
        </div>
        <div class="response"></div>
      </div>
      <!-- Downloader - TikTok -->
      <div class="card" data-cat="Downloader">
        <h2>TikTok Downloader</h2>
        <div class="endpoint">/api/download/tiktok?url=</div>
        <input class="input-url" placeholder="Masukkan URL TikTok..." data-type="tiktok"/>
        <div class="btn-group">
          <button class="btn" onclick="pasteToInput(this)">Paste Link</button>
          <button class="btn" onclick="fetchData(this)">Coba</button>
        </div>
        <div class="response"></div>
      </div>
      <!-- Tools - Base64 -->
      <div class="card" data-cat="Tools">
        <h2>Base64 Encode</h2>
        <div class="endpoint">/api/tools/base64?text=</div>
        <input class="input-url" placeholder="Masukkan teks untuk encode..." data-type="base64"/>
        <div class="btn-group">
          <button class="btn" onclick="pasteToInput(this)">Paste Text</button>
          <button class="btn" onclick="fetchData(this)">Coba</button>
        </div>
        <div class="response"></div>
      </div>
    </main>
  </div>
  <footer>© 2025 - AnimeVerse API | Dichxploit</footer>
  <script>
    function selectCat(cat) {
      document.querySelectorAll('.category').forEach(e=>e.classList.remove('active'));
      event.target.classList.add('active');
      filterCategories();
    }
    function filterCategories() {
      const sel = document.querySelector('.category.active').textContent;
      const s = document.getElementById('search').value.toLowerCase();
      document.querySelectorAll('.card').forEach(c=> {
        const t = c.querySelector('h2').textContent.toLowerCase();
        c.style.display = ((sel==='Semua'||c.dataset.cat===sel) && t.includes(s)) ? '' : 'none';
      });
    }
    function pasteToInput(btn) {
      const inp = btn.closest('.card').querySelector('.input-url');
      navigator.clipboard.readText().then(t=>inp.value=t).catch(()=>alert('Gagal baca clipboard'));
    }
    async function fetchData(btn) {
      const card = btn.closest('.card');
      const inp = card.querySelector('.input-url');
      const resp = card.querySelector('.response');
      const type = inp.dataset.type;
      const val = encodeURIComponent(inp.value.trim());
      if (!val) return alert('Isi dulu inputnya, bre!');
      let url = '';
      if (type==='instagram') url = \`/api/download/instagram?url=\${val}\`;
      else if (type==='tiktok') url = \`/api/download/tiktok?url=\${val}\`;
      else if (type==='base64') url = \`/api/tools/base64?text=\${val}\`;
      resp.style.display='block'; resp.textContent='Loading...';
      try {
        const r = await fetch(url);
        const js = await r.json();
        resp.textContent = JSON.stringify(js,null,2);
      } catch(e) {
        resp.textContent = 'Error: '+e.message;
      }
    }
  </script>
</body></html>`);
}
