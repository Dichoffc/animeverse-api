import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  const { url } = req.body;

  if (!url || !url.includes('tiktok.com')) {
    return res.status(400).json({ error: 'URL TikTok tidak valid' });
  }

  try {
    const response = await axios.get(`https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`);
    const data = response.data;

    if (!data || !data.video) {
      return res.status(500).json({ error: 'Gagal mengambil data dari TiklyDown' });
    }

    return res.status(200).json({
      author: data.author_name,
      title: data.title,
      video_no_watermark: data.video,
      thumbnail: data.thumbnail,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat memproses permintaan' });
  }
}
