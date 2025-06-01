import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url, format = 'mp4' } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Masukkan parameter ?url=https://tiktok.com/...',
    });
  }

  try {
    const api = `https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`;
    const response = await fetch(api);
    const data = await response.json();

    if (!data?.video?.no_watermark) {
      return res.status(404).json({
        status: false,
        message: 'Video tidak ditemukan atau URL salah.',
      });
    }

    const result = {
      title: data.description,
      thumbnail: data.cover,
      duration: data.duration,
      video_url: data.video.no_watermark,
      audio_url: data.music,
    };

    // Redirect langsung kalau format dipilih
    if (format === 'mp4') {
      return res.redirect(result.video_url);
    } else if (format === 'mp3') {
      return res.redirect(result.audio_url);
    } else {
      // Default JSON result
      return res.status(200).json({
        status: true,
        creator: 'AnimeVerse',
        result,
      });
    }
  } catch (err) {
    console.error('Error saat ambil data:', err);
    return res.status(500).json({
      status: false,
      message: 'Server error, coba lagi bre.',
    });
  }
}
