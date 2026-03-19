import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put } from '@vercel/blob'
import { logAction } from './audit-log'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mizo2026'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const auth = req.headers.authorization
  if (!auth || auth.slice(7) !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { filename, contentType, data } = req.body

  if (!data || !filename) {
    return res.status(400).json({ error: 'Datei fehlt' })
  }

  try {
    const buffer = Buffer.from(data, 'base64')

    if (buffer.length > 5 * 1024 * 1024) {
      return res.status(413).json({ error: 'Bild zu groß (max. 5MB)' })
    }

    const blob = await put(`vehicles/${Date.now()}-${filename}`, buffer, {
      access: 'public',
      contentType: contentType || 'image/jpeg',
    })

    await logAction(req, 'image_uploaded', `${filename} (${(buffer.length / 1024).toFixed(0)}KB)`)

    return res.status(200).json({ url: blob.url })
  } catch (err) {
    console.error('Upload error:', err)
    return res.status(500).json({ error: 'Upload fehlgeschlagen' })
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
}
