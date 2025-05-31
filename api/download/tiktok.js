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
    const api = `https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`;
    const response = await fetch(api);
    if (!response.ok) throw new Error('Gagal fetch API eksternal');

    const data = await response.json();

    if (data?.video?.no_watermark) {
      return res.status(200).json({
        status: true,
        creator: 'AnimeVerse',
        result: {
          title: data.description || 'No Title',
          thumbnail: data.cover || '',
          duration: data.duration || 0,
          download: data.video.no_watermark,
        },
      });
    } else {
      return res.status(404).json({
        status: false,
        message: 'Gagal mengambil video. Cek URL-nya bre.',
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({
      status: false,
      message: 'Server error.',
      error: error.message,
    });
  }
}
