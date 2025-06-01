import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Masukkan parameter ?url=https://tiktok.com/...',
    });
  }

  try {
    // Submit form ke SnapTik
    const response = await fetch('https://snaptik.app/abc2', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36',
      },
      body: `url=${encodeURIComponent(url)}`,
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const result = [];
    $('a.download-file').each((_, el) => {
      const href = $(el).attr('href');
      const quality = $(el).text().trim();
      if (href && href.startsWith('https')) {
        result.push({ quality, url: href });
      }
    });

    if (!result.length) {
      return res.status(404).json({
        status: false,
        message: 'Gagal mengambil video. Coba URL lain atau SnapTik sedang error.',
      });
    }

    res.status(200).json({
      status: true,
      creator: 'AnimeVerse',
      result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'Terjadi kesalahan server.',
    });
  }
}
