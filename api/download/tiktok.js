import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Masukkan parameter url'
    });
  }

  try {
    const response = await fetch(`https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (!data || !data.video) {
      return res.status(404).json({
        status: false,
        message: 'Video tidak ditemukan atau URL tidak valid'
      });
    }

    return res.status(200).json({
      status: true,
      source: 'tiklydown',
      result: data
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      message: `Terjadi kesalahan: ${e.message}`
    });
  }
}
