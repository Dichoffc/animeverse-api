import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('instagram.com')) {
    return res.status(400).json({ error: 'URL Instagram harus valid' });
  }

  try {
    // Request ke igram.io dengan URL Instagram yang ingin didownload
    const formData = new URLSearchParams();
    formData.append('url', url);

    const response = await fetch('https://igram.io/i/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Gagal request ke igram.io' });
    }

    const html = await response.text();

    // Cari link download dari response HTML
    // Biasanya link ada di <a href="..." class="btn btn-primary">Download</a>
    const regex = /<a[^>]+href="([^"]+)"[^>]*class="btn btn-primary"[^>]*>/g;

    let match;
    const links = [];

    while ((match = regex.exec(html)) !== null) {
      links.push(match[1]);
    }

    if (links.length === 0) {
      return res.status(404).json({ error: 'Link download tidak ditemukan' });
    }

    return res.status(200).json({ success: true, download_links: links });
  } catch (error) {
    return res.status(500).json({ error: 'Error: ' + error.message });
  }
}
