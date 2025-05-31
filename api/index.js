export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>AnimeVerse API List</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #111;
            color: #0f0;
            padding: 2rem;
          }
          h1 {
            color: #1abc9c;
          }
          ul {
            list-style-type: none;
            padding-left: 0;
          }
          li {
            margin-bottom: 10px;
            background: #222;
            padding: 10px;
            border-radius: 8px;
          }
          a {
            color: #1abc9c;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>AnimeVerse API Endpoints</h1>
        <ul>
          <li><strong>Download</strong>
            <ul>
              <li><a href="/api/download/tiktok">/api/download/tiktok</a></li>
              <li><a href="/api/download/instagram">/api/download/instagram</a></li>
            </ul>
          </li>
          <li><strong>Tools</strong>
            <ul>
              <li><a href="/api/tools/base64">/api/tools/base64</a></li>
            </ul>
          </li>
          <li><strong>AI</strong>
            <ul>
              <li><a href="/api/ai/chat">/api/ai/chat</a></li>
            </ul>
          </li>
        </ul>
      </body>
    </html>
  `);
}
