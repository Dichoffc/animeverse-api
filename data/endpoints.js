// data/endpoints.js
export const apiEndpoints = [
  {
    title: "Spotify Search Track",
    path: "/api/v1/spotify-search-track",
    desc: "Cari lagu di Spotify berdasarkan kata kunci.",
    categories: ["Search", "Audio"]
  },
  {
    title: "Spotify Downloader [audio]",
    path: "/api/v1/spotifydlv2",
    desc: "Unduh lagu dari Spotify menggunakan URL.",
    categories: ["Downloader", "Audio"]
  },
  {
    title: "Instagram Post Generator",
    path: "/api/v1/ig-post-generator",
    desc: "Menghasilkan gambar postingan Instagram palsu.",
    categories: ["Generator", "Image", "Social"]
  },
  {
    title: "SoundCloud Downloader",
    path: "/api/v1/soundcloud-downloader",
    desc: "Unduh audio dari SoundCloud menggunakan URL.",
    categories: ["Downloader", "Audio"]
  },
  // tambahin endpoint kamu lainnya sesuai kebutuh
];
