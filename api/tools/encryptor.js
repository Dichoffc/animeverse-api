import crypto from 'crypto';

export default async function handler(req, res) {
  const { mode = '', text = '', secret = '' } = req.query;

  if (!text || !secret || !['encrypt', 'decrypt'].includes(mode)) {
    return res.status(400).json({
      status: false,
      message: 'Gunakan query: mode=encrypt|decrypt, text=..., secret=...',
      creator: 'Dichxploit'
    });
  }

  try {
    const key = crypto.createHash('sha256').update(secret).digest(); // 32-byte key

    if (mode === 'encrypt') {
      const iv = crypto.randomBytes(12); // 12-byte IV untuk GCM
      const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

      const encrypted = Buffer.concat([
        cipher.update(text, 'utf8'),
        cipher.final()
      ]);
      const tag = cipher.getAuthTag();

      const result = {
        iv: iv.toString('hex'),
        tag: tag.toString('hex'),
        ciphertext: encrypted.toString('hex')
      };

      return res.json({
        status: true,
        mode: 'encrypt',
        encrypted: Buffer.from(JSON.stringify(result)).toString('base64'),
        creator: 'Dichxploit'
      });

    } else {
      const raw = JSON.parse(Buffer.from(text, 'base64').toString());
      const iv = Buffer.from(raw.iv, 'hex');
      const tag = Buffer.from(raw.tag, 'hex');
      const ciphertext = Buffer.from(raw.ciphertext, 'hex');

      const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
      decipher.setAuthTag(tag);

      const decrypted = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final()
      ]).toString('utf8');

      return res.json({
        status: true,
        mode: 'decrypt',
        decrypted,
        creator: 'Dichxploit'
      });
    }

  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Gagal proses data. Cek text & secret!',
      creator: 'Dichxploit',
      error: e.message
    });
  }
          }
