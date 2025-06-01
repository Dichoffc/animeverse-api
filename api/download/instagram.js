import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('instagram.com')) {
    return res.status(400).json({ error: 'URL Instagram harus valid' });
  }

  try {
    // Request ke saveclip.app
    const targetUrl = `https://saveclip.app/en/download?url=${encodeURIComponent(url)}`;

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Gagal request ke saveclip.app' });
    }

    const html = await response.text();

    // Cari link download dari tombol <a href="..." class="btn-download">
    const regex = /<a[^>]+href="([^"]+)"[^>]*class="btn-download"[^>]*>/g;

    let match;
    const links = [];

    while ((match = regex.exec(html)) !== null) {
      links.push(match[1]);
    }

    if (links.length === 0) {
      return res.status(404).json({ error: 'Link download tidak ditemukan di saveclip.app' });
    }

    return res.status(200).json({ success: true, download_links: links });

  } catch (error) {
    return res.status(500).json({ error: 'Error: ' + error.message });
  }
}
