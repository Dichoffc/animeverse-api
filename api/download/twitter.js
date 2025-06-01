import fetch from 'node-fetch';
import { load } from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url || !url.includes('twitter.com')) {
    return res.status(400).json({
      status: false,
      message: 'URL Twitter tidak valid.',
      creator: 'Dichxploit'
    });
  }

  try {
    const form = new URLSearchParams();
    form.append('URL', url);

    const response = await fetch('https://twdown.net/download.php', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent': 'Mozilla/5.0'
      },
      body: form
    });

    const html = await response.text();
    const $ = load(html);

    const result = [];
    $('table.table tbody tr').each((i, el) => {
      const quality = $(el).find('td:nth-child(1)').text().trim();
      const type = $(el).find('td:nth-child(2)').text().trim();
      const size = $(el).find('td:nth-child(3)').text().trim();
      const link = $(el).find('td:nth-child(4) a').attr('href');

      if (link) {
        result.push({ quality, type, size, url: link });
      }
    });

    if (!result.length) throw new Error('Video tidak ditemukan.');

    res.status(200).json({
      status: true,
      creator: 'Dichxploit',
      result
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      creator: 'Dichxploit'
    });
  }
      }
