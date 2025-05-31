export default function handler(req, res) {
  res.status(200).json({
    category: 'Download',
    services: [
      { name: 'Tiktok', endpoint: '/api/download/tiktok' },
      { name: 'Instagram', endpoint: '/api/download/instagram' },
      { name: 'YouTube', endpoint: '/api/download/youtube' }
    ]
  });
}
