import fetch from 'node-fetch';
import { load } from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) {
    return res.status(400).json({
      status: false,
      message: 'URL YouTube tidak valid.',
      creator: 'Dichxploit'
    });
  }

  try {
    const form = new URLSearchParams();
    form.append('url', url);

    const response = await fetch('https://ytmate.guru/api/ajaxSearch/index', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
        'user-agent': 'Mozilla/5.0'
      },
      body: form
    });

    const result = await response.json();
    const $ = load(result.data);

    const title = $('b').first().text().trim();
    const thumb = $('img').attr('src');

    const video = [];
    $('#mp4 > table > tbody > tr').each((_, el) => {
      const quality = $(el).find('td').eq(0).text().trim();
      const size = $(el).find('td').eq(1).text().trim();
      const link = $(el).find('a').attr('href');
      if (link) video.push({ quality, size, url: link });
    });

    const audio = [];
    $('#mp3 > table > tbody > tr').each((_, el) => {
      const quality = $(el).find('td').eq(0).text().trim();
      const size = $(el).find('td').eq(1).text().trim();
      const link = $(el).find('a').attr('href');
      if (link) audio.push({ quality, size, url: link });
    });

    res.status(200).json({
      status: true,
      creator: 'Dichxploit',
      title,
      thumbnail: thumb,
      video,
      audio
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      creator: 'Dichxploit'
    });
  }
}
