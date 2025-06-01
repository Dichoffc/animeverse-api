import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('instagram.com')) {
    return res.status(400).json({ error: 'URL Instagram harus diisi dan valid' });
  }

  try {
    // Request ke fastdl.app dengan URL Instagram yang mau di-download
    const fastdlUrl = `https://fastdl.app/en/download?url=${encodeURIComponent(url)}`;

    const response = await fetch(fastdlUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      return res.status(500).json({ error: 'Gagal request ke fastdl.app' });
    }

    const html = await response.text();

    // Parsing simple: cari semua link download dari tombol/elemen yang biasa ada di fastdl.app
    // Biasanya ada di <a href="..." class="btn-download"> atau <a href="..." target="_blank">
    // Kita ambil yang ada "download" atau "instagram" di href-nya
    const regex = /<a[^>]+href="([^"]+)"[^>]*>(?:Download|download|Download Video|download video)?<\/a>/g;

    let match;
    const links = [];

    while ((match = regex.exec(html)) !== null) {
      const link = match[1];
      if (link.includes('instagram') || link.includes('cdn')) {
        links.push(link);
      }
    }

    if (links.length === 0) {
      return res.status(404).json({ error: 'Link download tidak ditemukan di fastdl.app' });
    }

    return res.status(200).json({ success: true, download_links: links });

  } catch (error) {
    return res.status(500).json({ error: 'Error: ' + error.message });
  }
}
