export default function handler(req, res) {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to AnimeVerse API',
    endpoints: [
      { category: 'Download', path: '/api/download' },
      { category: 'Tools', path: '/api/tools' },
      { category: 'AI', path: '/api/ai' }
    ]
  });
}
