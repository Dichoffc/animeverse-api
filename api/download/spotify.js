import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('spotify.com/track/')) {
    return res.status(400).json({
      status: false,
      message: 'URL Spotify tidak valid. Gunakan link lagu (track).',
      creator: 'Dichxploit'
    });
  }

  try {
    const apiUrl = `https://api.spotifydown.com/download/${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl, {
      headers: {
        'user-agent': 'Mozilla/5.0'
      }
    });

    const data = await response.json();

    if (!data.success) throw new Error(data.message || 'Gagal mengambil audio.');

    res.status(200).json({
      status: true,
      creator: 'Dichxploit',
      title: data.title,
      artist: data.artist,
      thumbnail: data.cover,
      audio: data.link
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      creator: 'Dichxploit'
    });
  }
}
