import fetch from 'node-fetch';
import { load } from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('facebook.com')) {
    return res.status(400).json({
      status: false,
      message: 'URL Facebook tidak valid.',
      creator: 'Dichxploit'
    });
  }

  try {
    const params = new URLSearchParams({ url });
    const getRes = await fetch('https://saveas.co/facebook-downloader.php', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent': 'Mozilla/5.0'
      },
      body: params
    });

    const html = await getRes.text();
    const $ = load(html);

    const video = $('#download-box a').attr('href');
    const thumb = $('.download-left img').attr('src');
    const title = $('.download-right h4').text().trim();

    if (!video) throw new Error('Gagal mengambil video.');

    res.status(200).json({
      status: true,
      creator: 'Dichxploit',
      title,
      thumbnail: thumb,
      download: video
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      creator: 'Dichxploit'
    });
  }
        }
