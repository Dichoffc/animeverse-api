export default function handler(req, res) {
  res.status(200).json({
    service: 'Tiktok Downloader',
    example: '/api/download/tiktok?url=https://tiktok.com/xyz'
  });
}
