import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Ganti dengan API gratis atau endpoint pihak ketiga yang support
    const response = await axios.get(`https://api.tiklydown.com/api/download/ig?url=${encodeURIComponent(url)}`);

    if (response.data && response.data.data) {
      return res.status(200).json({
        success: true,
        data: response.data.data,
      });
    } else {
      return res.status(404).json({ success: false, error: 'No media found' });
    }

  } catch (error) {
    console.error('IG Download Error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch media' });
  }
}
