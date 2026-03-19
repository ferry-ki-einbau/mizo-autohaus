import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put, list } from '@vercel/blob'

const LOG_KEY = 'audit-log.json'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mizo2026'

export interface AuditEntry {
  timestamp: string
  action: 'vehicle_created' | 'vehicle_updated' | 'vehicle_deleted' | 'image_uploaded' | 'login'
  ip: string
  userAgent: string
  details: string
  vehicleId?: string
}

export async function logAction(req: VercelRequest, action: AuditEntry['action'], details: string, vehicleId?: string) {
  try {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
      || (req.headers['x-real-ip'] as string)
      || 'unknown'

    const entry: AuditEntry = {
      timestamp: new Date().toISOString(),
      action,
      ip,
      userAgent: (req.headers['user-agent'] as string) || 'unknown',
      details,
      vehicleId,
    }

    // Bestehenden Log laden
    let logs: AuditEntry[] = []
    try {
      const { blobs } = await list({ prefix: LOG_KEY })
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url)
        if (res.ok) logs = await res.json()
      }
    } catch { /* empty log */ }

    // Neuen Eintrag hinzufügen (max 500 Einträge behalten)
    logs.unshift(entry)
    if (logs.length > 500) logs = logs.slice(0, 500)

    await put(LOG_KEY, JSON.stringify(logs), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
  } catch (err) {
    console.error('Audit log error:', err)
    // Audit-Log Fehler soll nicht die Hauptaktion blockieren
  }
}

// GET endpoint — Audit-Log lesen (nur Admin)
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const auth = req.headers.authorization
  if (!auth || auth.slice(7) !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { blobs } = await list({ prefix: LOG_KEY })
    if (blobs.length === 0) return res.status(200).json([])
    const response = await fetch(blobs[0].url)
    if (!response.ok) return res.status(200).json([])
    const logs = await response.json()
    return res.status(200).json(logs)
  } catch {
    return res.status(200).json([])
  }
}
