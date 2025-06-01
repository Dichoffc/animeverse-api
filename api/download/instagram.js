import fetch from 'node-fetch';

async function downloadInstagram(instagramUrl) {
  if (!instagramUrl) throw new Error('Parameter instagramUrl wajib diisi');

  const encoded = encodeURIComponent(instagramUrl);
  const api = `https://r-nozawa.hf.space/aio?url=${encoded}`;

  const res = await fetch(api);
  if (!res.ok) throw new Error(`Gagal request, status: ${res.status}`);

  const text = await res.text();

  // coba parse JSON, kalau gagal throw error
  try {
    const json = JSON.parse(text);
    return json;
  } catch {
    throw new Error('Response bukan JSON valid');
  }
}

// Ambil URL dari argumen command line
const inputUrl = process.argv[2];

if (!inputUrl) {
  console.error('Usage: node Instagram.js <instagram_url>');
  process.exit(1);
}

(async () => {
  try {
    const result = await downloadInstagram(inputUrl);
    console.log('Response JSON:\n', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
