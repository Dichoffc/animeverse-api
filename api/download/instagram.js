import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res
      .status(406)
      .setHeader('Content-Type', 'application/json')
      .send({
        status: false,
        creator: 'Kyy',
        code: 406,
        message: 'masukkan parameter url'
      });
  }

  try {
    // Contoh: memakai igram.io (bisa kamu ganti sesuai endpoint aslinya)
    const { data } = await axios.post(
      'https://igram.io/i/',
      new URLSearchParams({ url }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0',
          'Referer': 'https://igram.io/',
          'Origin': 'https://igram.io'
        }
      }
    );

    const $ = cheerio.load(data);
    const links = [];

    $('a.btn-download').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('http')) {
        links.push(href);
      }
    });

    if (!links.length) {
      return res.status(404).json({
        status: false,
        creator: 'Kyy',
        code: 404,
        message: 'Media tidak ditemukan atau url tidak valid'
      });
    }

    return res.status(200).json({
      status: true,
      creator: 'Kyy',
      type: 'media',
      result: links
    });

  } catch (e) {
    return res.status(500).json({
      status: false,
      creator: 'Kyy',
      code: 500,
      message: `Terjadi kesalahan: ${e.message}`
    });
  }
}
