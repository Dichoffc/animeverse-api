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
    // Resolve shortlink jika pakai vt.tiktok.com
    const resolvedUrl = await fetch(url, { method: 'HEAD', redirect: 'follow' })
      .then((res) => res.url)
      .catch(() => url);

    const api = `https://api.tiklydown.me/api/download?url=${encodeURIComponent(resolvedUrl)}`;
    const response = await fetch(api);
    const data = await response.json();

    if (!data || !data.video?.no_watermark) {
      return res.status(400).json({
        status: false,
        message: 'Gagal mengambil video. Coba gunakan link langsung dari aplikasi TikTok.',
      });
    }

    return res.redirect(data.video.no_watermark); // Redirect langsung ke video
  } catch (error) {
    console.error('Download Error:', error.message);
    return res.status(500).json({
      status: false,
      message: 'Terjadi error saat memproses link.',
    });
  }
}
