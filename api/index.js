export default function handler(req, res) {
  res.status(200).json({
    status: true,
    message: "Welcome to AnimeVerse API",
    endpoints: {
      download: "/api/download",
      tools: "/api/tools",
      ai: "/api/ai"
    }
  });
}
