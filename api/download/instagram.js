import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('instagram.com/p/')) {
    return res.status(400).json({ error: 'URL harus posting Instagram publik' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      return res.status(404).json({ error: 'Posting tidak ditemukan atau private' });
    }

    const html = await response.text();

    const jsonMatch = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/);

    if (!jsonMatch) {
      return res.status(404).json({ error: 'Gagal menemukan data media' });
    }

    const data = JSON.parse(jsonMatch[1]);

    let media_url = null;
    if (data['@type'] === 'ImageObject' || data['@type'] === 'VideoObject') {
      media_url = data.contentUrl;
    }

    if (!media_url) {
      return res.status(404).json({ error: 'Media tidak ditemukan' });
    }

    return res.status(200).json({ media_url });

  } catch (error) {
    return res.status(500).json({ error: 'Error saat mengambil data: ' + error.message });
  }
}
