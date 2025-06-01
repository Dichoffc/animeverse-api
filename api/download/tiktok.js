import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Masukkan parameter ?url=https://tiktok.com/...',
    });
  }

  try {
    // Kirim POST ke snaptik.app dengan URL tiktok-nya
    const response = await fetch('https://snaptik.app/abc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0',
      },
      body: `url=${encodeURIComponent(url)}`,
    });
    const text = await response.text();

    // Parse HTML hasil response
    const dom = new JSDOM(text);
    const document = dom.window.document;

    // Cari link download video tanpa watermark
    const videoLink = document.querySelector('a[href*="snaptik.app"]');
    const noWatermark = videoLink ? videoLink.href : null;

    if (!noWatermark) {
      return res.status(404).json({
        status: false,
        message: 'Video tidak ditemukan / gagal mengambil link download.',
      });
    }

    res.status(200).json({
      status: true,
      creator: 'AnimeVerse',
      result: {
        download_no_watermark: noWatermark,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'Server error.',
    });
  }
}
