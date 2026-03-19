import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put, list, del } from '@vercel/blob'

const DATA_KEY = 'mizo-vehicles.json'
const LOG_KEY = 'mizo-audit-log.json'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'mizo2026'

interface Vehicle {
  id: string
  marke: string
  modell: string
  baujahr: string
  kilometerstand: string
  preis: string
  kraftstoff: string
  getriebe: string
  farbe: string
  beschreibung: string
  bilder: string[]
  createdAt: string
}

function checkAuth(req: VercelRequest): boolean {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return false
  return auth.slice(7) === ADMIN_PASSWORD
}

async function logAction(req: VercelRequest, action: string, details: string, vehicleId?: string) {
  try {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown'
    const entry = {
      timestamp: new Date().toISOString(),
      action,
      ip,
      userAgent: (req.headers['user-agent'] as string) || 'unknown',
      details,
      vehicleId,
    }
    // Einfach Log laden, neuen Eintrag hinzufügen, speichern
    let logs: typeof entry[] = []
    try {
      const { blobs } = await list({ prefix: LOG_KEY })
      if (blobs.length > 0) {
        const r = await fetch(blobs[0].url)
        if (r.ok) logs = await r.json()
      }
    } catch { /* first time */ }
    logs.unshift(entry)
    if (logs.length > 500) logs = logs.slice(0, 500)
    await put(LOG_KEY, JSON.stringify(logs), { access: 'public', contentType: 'application/json', addRandomSuffix: false })
  } catch (err) {
    console.error('Audit log error (non-fatal):', err)
  }
}

async function getVehicles(): Promise<Vehicle[]> {
  try {
    const { blobs } = await list({ prefix: DATA_KEY })
    if (blobs.length === 0) return []
    const res = await fetch(blobs[0].url)
    if (!res.ok) return []
    return await res.json()
  } catch {
    return []
  }
}

async function saveVehicles(vehicles: Vehicle[]): Promise<void> {
  await put(DATA_KEY, JSON.stringify(vehicles), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  if (req.method === 'OPTIONS') return res.status(200).end()

  try {
    if (req.method === 'GET') {
      const vehicles = await getVehicles()
      return res.status(200).json(vehicles)
    }

    if (!checkAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'POST') {
      const body = req.body
      if (!body?.marke || !body?.modell) {
        return res.status(400).json({ error: 'Marke und Modell sind Pflicht' })
      }

      const vehicles = await getVehicles()
      const newVehicle: Vehicle = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        marke: body.marke,
        modell: body.modell,
        baujahr: body.baujahr || '',
        kilometerstand: body.kilometerstand || '',
        preis: body.preis || '',
        kraftstoff: body.kraftstoff || '',
        getriebe: body.getriebe || '',
        farbe: body.farbe || '',
        beschreibung: body.beschreibung || '',
        bilder: body.bilder || [],
        createdAt: new Date().toISOString(),
      }

      vehicles.unshift(newVehicle)
      await saveVehicles(vehicles)
      await logAction(req, 'vehicle_created', `${body.marke} ${body.modell}`, newVehicle.id)
      return res.status(201).json(newVehicle)
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      if (!id || typeof id !== 'string') return res.status(400).json({ error: 'ID fehlt' })

      const vehicles = await getVehicles()
      const vehicle = vehicles.find(v => v.id === id)
      if (!vehicle) return res.status(404).json({ error: 'Nicht gefunden' })

      for (const bildUrl of vehicle.bilder) {
        try { await del(bildUrl) } catch { /* ok */ }
      }

      await saveVehicles(vehicles.filter(v => v.id !== id))
      await logAction(req, 'vehicle_deleted', `${vehicle.marke} ${vehicle.modell}`, id)
      return res.status(200).json({ success: true })
    }

    if (req.method === 'PATCH') {
      const { id } = req.query
      if (!id || typeof id !== 'string') return res.status(400).json({ error: 'ID fehlt' })

      const vehicles = await getVehicles()
      const index = vehicles.findIndex(v => v.id === id)
      if (index === -1) return res.status(404).json({ error: 'Nicht gefunden' })

      vehicles[index] = { ...vehicles[index], ...req.body, id: vehicles[index].id }
      await saveVehicles(vehicles)
      await logAction(req, 'vehicle_updated', `${vehicles[index].marke} ${vehicles[index].modell}`, id as string)
      return res.status(200).json(vehicles[index])
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('Vehicles API error:', err)
    return res.status(500).json({ error: 'Server-Fehler', details: String(err) })
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
}
