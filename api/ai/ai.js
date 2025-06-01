import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { prompt = '', system = '' } = req.query;

  if (!prompt.trim()) {
    return res.status(400).json({
      status: false,
      message: 'Masukkan pertanyaan!',
      creator: 'Dichxploit'
    });
  }

  const input = system
    ? `${system.trim()}\nPertanyaan: ${prompt.trim()}`
    : prompt.trim();

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-small', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: input,
        parameters: {
          max_new_tokens: 100
        }
      })
    });

    const data = await response.json();
    const output = data[0]?.generated_text || 'Gagal generate teks';

    res.status(200).json({
      status: true,
      creator: 'Dichxploit',
      system_used: system || '(default)',
      prompt: prompt,
      response: output
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
      creator: 'Dichxploit'
    });
  }
        }
