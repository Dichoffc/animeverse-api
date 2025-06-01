import fetch from 'node-fetch';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
      return new Response(JSON.stringify({ error: 'Parameter url wajib diisi' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const encodedUrl = encodeURIComponent(targetUrl);
    const apiUrl = `https://r-nozawa.hf.space/aio?url=${encodedUrl}`;

    const res = await fetch(apiUrl);
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Gagal request ke sumber' }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const text = await res.text();

    try {
      const json = JSON.parse(text);
      return new Response(JSON.stringify(json), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      // Kalau bukan JSON valid, return error
      return new Response(JSON.stringify({ error: 'Response bukan JSON valid' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
