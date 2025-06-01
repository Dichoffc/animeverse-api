// File: api/tools/enhancer.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Masukkan parameter ?url=',
      creator: 'Dichxploit'
    });
  }

  try {
    // Cek header content-type
    const head = await fetch(url, { method: 'HEAD' });
    if (!head.ok) throw new Error('Gagal ambil header URL');

    const contentType = head.headers.get('content-type');

    if (!contentType) {
      throw new Error('Content-Type tidak ditemukan');
    }

    if (contentType.startsWith('image/')) {
      // Gambar, kasih link upscale.media
      const enhanceUrl = `https://upscale.media/process?image_url=${encodeURIComponent(url)}`;

      return res.json({
        status: true,
        type: 'image',
        message: 'Gambar siap diproses di Upscale.media',
        original_url: url,
        enhance_url: enhanceUrl,
        creator: 'Dichxploit'
      });

    } else if (contentType.startsWith('video/')) {
      // Video, kasih rekomendasi enhancer manual
      return res.json({
        status: true,
        type: 'video',
        message: 'Enhancer otomatis untuk video belum tersedia tanpa ffmpeg. Gunakan layanan pihak ketiga seperti veed.io atau pixop.com.',
        tools: [
          'https://www.veed.io/',
          'https://www.pixop.com/',
          'https://www.kapwing.com/video-enhancer'
        ],
        original_url: url,
        creator: 'Dichxploit'
      });

    } else {
      return res.status(400).json({
        status: false,
        message: 'Jenis file tidak didukung (bukan gambar/video)',
        creator: 'Dichxploit'
      });
    }

  } catch (e) {
    return res.status(500).json({
      status: false,
      message: 'Gagal memproses URL',
      error: e.message,
      creator: 'Dichxploit'
    });
  }
  }
