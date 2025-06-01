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
    // Resolve redirect jika link menggunakan vt.tiktok.com
    const resolvedUrl = await fetch(url, { method: 'HEAD', redirect: 'follow' })
      .then((response) => response.url)
      .catch(() => url); // fallback kalau gagal resolve

    const api = `https://api.tiklydown.me/api/download?url=${encodeURIComponent(resolvedUrl)}`;
    const response = await fetch(api);
    const data = await response.json();

    if (data?.video?.no_watermark) {
      return res.status(200).json({
        status: true,
        creator: 'AnimeVerse',
        result: {
          title: data.description || 'Video TikTok',
          thumbnail: data.cover,
          duration: data.duration,
          download: {
            video: data.video.no_watermark,
            music: data.music,
          },
        },
      });
    } else {
      return res.status(404).json({
        status: false,
        message: 'Gagal mengambil video. Pastikan link TikTok valid.',
      });
    }
  } catch (err) {
    console.error('Server Error:', err.message);
    return res.status(500).json({
      status: false,
      message: 'Terjadi kesalahan pada server.',
    });
  }
}
