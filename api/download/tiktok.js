import fetch from 'node-fetch';

async function resolveRedirect(url) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
    });
    return res.url; // URL hasil redirect
  } catch (err) {
    console.error('Gagal resolve shortlink:', err);
    return url; // fallback ke URL asli
  }
}

export default async function handler(req, res) {
  let { url, format = 'mp4' } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: 'Masukkan parameter ?url=https://tiktok.com/...',
    });
  }

  try {
    // ⏩ Resolve short URL kalau pakai vt.tiktok.com
    if (url.includes('vt.tiktok.com')) {
      url = await resolveRedirect(url);
    }

    const api = `https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`;
    const response = await fetch(api);
    const data = await response.json();

    if (!data?.video?.no_watermark) {
      return res.status(404).json({
        status: false,
        message: 'Gagal mengambil video. Cek URL-nya bre.',
      });
    }

    const result = {
      title: data.description,
      thumbnail: data.cover,
      duration: data.duration,
      video_url: data.video.no_watermark,
      audio_url: data.music,
    };

    if (format === 'mp4') {
      return res.redirect(result.video_url);
    } else if (format === 'mp3') {
      return res.redirect(result.audio_url);
    } else {
      return res.status(200).json({
        status: true,
        creator: 'AnimeVerse',
        result,
      });
    }
  } catch (err) {
    console.error('Crash saat download:', err);
    return res.status(500).json({
      status: false,
      message: 'Server error bro. Coba lagi bentar.',
    });
  }
}
