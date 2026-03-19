import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put, list } from '@vercel/blob'

const LOG_KEY = 'audit-log.json'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mizo2026'

async function logAction(req: VercelRequest, action: string, details: string) {
  try {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
      || (req.headers['x-real-ip'] as string) || 'unknown'
    let logs: { timestamp: string; action: string; ip: string; userAgent: string; details: string }[] = []
    try {
      const { blobs } = await list({ prefix: LOG_KEY })
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url)
        if (res.ok) logs = await res.json()
      }
    } catch { /* empty */ }
    logs.unshift({
      timestamp: new Date().toISOString(),
      action,
      ip,
      userAgent: (req.headers['user-agent'] as string) || 'unknown',
      details,
    })
    if (logs.length > 500) logs = logs.slice(0, 500)
    await put(LOG_KEY, JSON.stringify(logs), { access: 'public' as const, contentType: 'application/json', addRandomSuffix: false, allowOverwrite: true })
  } catch { /* non-fatal */ }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const auth = req.headers.authorization
  if (!auth || auth.slice(7) !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' })

  const { filename, contentType, data } = req.body
  if (!data || !filename) return res.status(400).json({ error: 'Datei fehlt' })

  try {
    const buffer = Buffer.from(data, 'base64')
    if (buffer.length > 5 * 1024 * 1024) return res.status(413).json({ error: 'Bild zu groß (max. 5MB)' })

    const blob = await put(`vehicles/${Date.now()}-${filename}`, buffer, {
      access: 'public' as const,
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
