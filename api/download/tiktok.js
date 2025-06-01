import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('tiktok.com')) {
    return res.status(400).json({
      status: false,
      message: 'URL TikTok tidak valid.',
      creator: 'Dichxploit'
    });
  }

  try {
    const fetchRes = await fetch('https://tikwm.com/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        origin: 'https://tikwm.com',
        referer: 'https://tikwm.com/',
        'user-agent': 'Mozilla/5.0'
      },
      body: new URLSearchParams({ url })
    });

    const result = await fetchRes.json();

    if (!result || !result.data || !result.data.play) {
      return res.status(500).json({
        status: false,
        message: 'Gagal mengambil data dari tikwm.com.',
        creator: 'Dichxploit'
      });
    }

    return res.status(200).json({
      status: true,
      creator: 'Dichxploit',
      author: result.data.author,
      title: result.data.title,
      cover: result.data.cover,
      duration: result.data.duration,
      like: result.data.digg_count,
      comment: result.data.comment_count,
      share: result.data.share_count,
      play_count: result.data.play_count,
      video_no_watermark: result.data.play,
      video_watermark: result.data.wmplay,
      music: result.data.music
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: 'Server error: ' + err.message,
      creator: 'Dichxploit'
    });
  }
}
