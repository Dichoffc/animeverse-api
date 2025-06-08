// pages/api/index.js
import { apiEndpoints } from '../../data/endpoints.js';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AnimeVerse API</title>
  <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet">
  <style>
    body { margin:0; font-family:'Rubik',sans-serif; background:#0d0d0d; color:#fff; }
    .header { padding:1rem; text-align:center; background:#111; font-size:1.5rem; color:#1abc9c; }
    .flex { display:flex; }
    .sidebar { width:220px; background:#111; height:calc(100vh - 60px); overflow:auto; padding:1rem; }
    .sidebar .category { margin-bottom:0.5rem; padding:0.4rem; border-radius:4px; cursor:pointer; }
    .sidebar .active { background:#1abc9c; font-weight:bold; }
    .content { flex:1; padding:1rem; overflow:auto; height:calc(100vh - 60px); }
    .card { background:#1c1c1c; border-radius:8px; padding:1rem; margin-bottom:1rem; }
    .card h2 { margin:0 0 .5rem; color:#1abc9c; }
    .endpoint { background:#111; padding:.5rem; font-family:monospace; border-radius:4px; overflow-x:auto; }
    .btn { display:inline-block; margin-top:.5rem; background:#1abc9c; color:#fff; padding:.5rem 1rem; text-decoration:none; border-radius:4px; }
    .btn:hover { background:#16a085; }
    .tags { margin-top:.5rem; }
    .tag { display:inline-block; background:#333; color:#ccc; padding:0.2rem .5rem; margin-right:0.3rem; border-radius:4px; font-size:0.8rem; }
    footer { text-align:center; padding:1rem; font-size:0.8rem; color:#888; }
  </style>
</head>
<body>
  <div class="header">AnimeVerse API</div>
  <div class="flex">
    <div class="sidebar" id="sidebar"></div>
    <div class="content" id="content"></div>
  </div>
  <footer>© 2025 - AnimeVerse API | Created by Dichxploit</footer>
  <script>
    const endpoints = ${JSON.stringify(apiEndpoints)};
    const categories = ["Semua Kategori", ...new Set(endpoints.flatMap(e => e.categories))];
    let selected = "Semua Kategori";

    function renderSidebar() {
      const sb = document.getElementById("sidebar");
      sb.innerHTML = categories.map(cat => 
        \`<div class="category \${cat === selected ? 'active' : ''}" onclick="selectCat('\${cat}')">\${cat}</div>\`
      ).join('');
    }

    function renderContent() {
      const ct = document.getElementById("content");
      const filtered = selected === "Semua Kategori"
        ? endpoints
        : endpoints.filter(e => e.categories.includes(selected));
      ct.innerHTML = filtered.map(e => \`
        <div class="card">
          <h2>\${e.title}</h2>
          <p>\${e.desc}</p>
          <div class="endpoint">\${e.path}</div>
          <a class="btn" href="\${e.path}" target="_blank">Coba</a>
          <div class="tags">\${e.categories.map(c=>'<span class="tag">'+c+'</span>').join('')}</div>
        </div>\`).join('');
    }

    function selectCat(cat) {
      selected = cat;
      renderSidebar();
      renderContent();
    }

    window.onload = () => {
      renderSidebar();
      renderContent();
    };
  </script>
</body>
</html>`);
}
