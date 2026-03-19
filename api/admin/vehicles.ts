import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put, list, del } from '@vercel/blob'
import { logAction } from './audit-log'

const DATA_KEY = 'vehicles.json'
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
  // GET — public, no auth needed (for frontend)
  if (req.method === 'GET') {
    const vehicles = await getVehicles()
    return res.status(200).json(vehicles)
  }

  // All other methods need auth
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // POST — add vehicle
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

    await logAction(req, 'vehicle_created', `${body.marke} ${body.modell} — ${body.preis || 'kein Preis'}€`, newVehicle.id)

    return res.status(201).json(newVehicle)
  }

  // DELETE — remove vehicle
  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ID fehlt' })
    }

    const vehicles = await getVehicles()
    const vehicle = vehicles.find(v => v.id === id)

    if (!vehicle) {
      return res.status(404).json({ error: 'Fahrzeug nicht gefunden' })
    }

    for (const bildUrl of vehicle.bilder) {
      try { await del(bildUrl) } catch { /* already deleted */ }
    }

    const filtered = vehicles.filter(v => v.id !== id)
    await saveVehicles(filtered)

    await logAction(req, 'vehicle_deleted', `${vehicle.marke} ${vehicle.modell} (ID: ${id})`, id)

    return res.status(200).json({ success: true })
  }

  // PATCH — update vehicle
  if (req.method === 'PATCH') {
    const { id } = req.query
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ID fehlt' })
    }

    const vehicles = await getVehicles()
    const index = vehicles.findIndex(v => v.id === id)
    if (index === -1) {
      return res.status(404).json({ error: 'Fahrzeug nicht gefunden' })
    }

    const body = req.body
    const changed = Object.keys(body).filter(k => k !== 'id').join(', ')
    vehicles[index] = { ...vehicles[index], ...body, id: vehicles[index].id }
    await saveVehicles(vehicles)

    await logAction(req, 'vehicle_updated', `${vehicles[index].marke} ${vehicles[index].modell} — geändert: ${changed}`, id as string)

    return res.status(200).json(vehicles[index])
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export const config = {
  api: { bodyParser: { sizeLimit: '10mb' } },
}
