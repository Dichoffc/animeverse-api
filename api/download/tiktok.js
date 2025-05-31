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
    const data = await response.json();

    if (data?.video?.no_watermark) {
      res.status(200).json({
        status: true,
        creator: 'AnimeVerse',
        result: {
          title: data.description,
          thumbnail: data.cover,
          duration: data.duration,
          download: data.video.no_watermark,
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
