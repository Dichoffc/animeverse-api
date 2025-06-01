import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Masukkan parameter ?url=https://tiktok.com/...',
    });
  }

  try {
    // Endpoint TikWM untuk download video TikTok
    const api = `https://api.tikwm.com/v1/video/detail?url=${encodeURIComponent(url)}`;

    const response = await fetch(api);
    const data = await response.json();

    if (data && data.success && data.data && data.data.video) {
      res.status(200).json({
        status: true,
        creator: 'AnimeVerse',
        result: {
          title: data.data.title || '',
          author: data.data.author || '',
          duration: data.data.duration || '',
          thumbnail: data.data.cover || '',
          download: data.data.video.play || '',        // Video tanpa watermark
          download_no_watermark: data.data.video.no_watermark || '', // Kalau ada video no watermark
          music: data.data.music || '',                 // Link musik (MP3)
        },
      });
    } else {
      res.status(404).json({
        status: false,
        message: 'Gagal mengambil video. Cek URL-nya bre.',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'Server error.',
    });
  }
}
