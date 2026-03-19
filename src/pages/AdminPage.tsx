import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock, LogOut, Plus, Trash2, Car, Loader2, X, Upload,
  Image as ImageIcon, Check
} from 'lucide-react'
import { cn } from '@/lib/utils'

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

const marken = ['Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mazda', 'Mercedes-Benz', 'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Seat', 'Skoda', 'Smart', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo', 'Andere']
const kraftstoffe = ['Benzin', 'Diesel', 'Elektro', 'Hybrid', 'Plug-in-Hybrid', 'Erdgas', 'Autogas']
const getriebeTypen = ['Automatik', 'Schaltgetriebe']

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [uploadingImages, setUploadingImages] = useState(false)

  // New vehicle form
  const [form, setForm] = useState({
    marke: '', modell: '', baujahr: '', kilometerstand: '',
    preis: '', kraftstoff: '', getriebe: '', farbe: '', beschreibung: '',
  })
  const [pendingImages, setPendingImages] = useState<{ file: File; preview: string }[]>([])

  // Check if already logged in (session)
  useEffect(() => {
    const stored = sessionStorage.getItem('mizo-admin-pw')
    if (stored) {
      setPassword(stored)
      setAuthed(true)
    }
  }, [])

  // Fetch vehicles when authed
  const fetchVehicles = useCallback(async () => {
    if (!authed) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin/vehicles')
      if (res.ok) {
        const data = await res.json()
        setVehicles(data)
      }
    } catch { /* handled */ }
    setLoading(false)
  }, [authed])

  useEffect(() => { fetchVehicles() }, [fetchVehicles])

  const handleLogin = async () => {
    setAuthError('')
    // Test auth by making a dummy request
    try {
      const res = await fetch('/api/admin/vehicles')
      if (res.ok) {
        setAuthed(true)
        sessionStorage.setItem('mizo-admin-pw', password)
      } else {
        setAuthError('Verbindungsfehler')
      }
    } catch {
      // For now just authenticate locally — real check happens on write operations
      setAuthed(true)
      sessionStorage.setItem('mizo-admin-pw', password)
    }
  }

  const handleLogout = () => {
    setAuthed(false)
    setPassword('')
    sessionStorage.removeItem('mizo-admin-pw')
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newImages = Array.from(files).slice(0, 8 - pendingImages.length).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setPendingImages(prev => [...prev, ...newImages].slice(0, 8))
  }

  const removeImage = (index: number) => {
    setPendingImages(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1]
        try {
          const res = await fetch('/api/admin/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${password}`,
            },
            body: JSON.stringify({
              filename: file.name,
              contentType: file.type,
              data: base64,
            }),
          })
          if (!res.ok) throw new Error('Upload failed')
          const { url } = await res.json()
          resolve(url)
        } catch (err) {
          reject(err)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async () => {
    if (!form.marke || !form.modell || submitting) return
    setSubmitting(true)

    try {
      // Upload images first
      let bildUrls: string[] = []
      if (pendingImages.length > 0) {
        setUploadingImages(true)
        bildUrls = await Promise.all(pendingImages.map(img => uploadImage(img.file)))
        setUploadingImages(false)
      }

      // Create vehicle
      const res = await fetch('/api/admin/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`,
        },
        body: JSON.stringify({ ...form, bilder: bildUrls }),
      })

      if (!res.ok) throw new Error('Failed to create')

      // Reset form
      setForm({ marke: '', modell: '', baujahr: '', kilometerstand: '', preis: '', kraftstoff: '', getriebe: '', farbe: '', beschreibung: '' })
      pendingImages.forEach(img => URL.revokeObjectURL(img.preview))
      setPendingImages([])
      setShowForm(false)
      await fetchVehicles()
    } catch {
      alert('Fehler beim Einstellen. Bitte versuche es erneut.')
    }

    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Fahrzeug wirklich löschen?')) return
    setDeleting(id)
    try {
      await fetch(`/api/admin/vehicles?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${password}` },
      })
      await fetchVehicles()
    } catch {
      alert('Fehler beim Löschen.')
    }
    setDeleting(null)
  }

  // Login Screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-bg-soft flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-accent/10 rounded-xl mx-auto mb-6">
            <Lock className="w-7 h-7 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-primary text-center mb-2">Admin-Bereich</h1>
          <p className="text-text-muted text-sm text-center mb-6">Mizo Autohaus Fahrzeugverwaltung</p>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="Passwort eingeben"
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent"
              autoFocus
            />
            {authError && <p className="text-error text-sm">{authError}</p>}
            <button
              onClick={handleLogin}
              disabled={!password}
              className="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              Einloggen
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-bg-soft pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Fahrzeugverwaltung</h1>
            <p className="text-text-muted text-sm mt-1">{vehicles.length} Fahrzeug{vehicles.length !== 1 ? 'e' : ''} im Bestand</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Fahrzeug einstellen
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-text-muted hover:text-primary hover:bg-white transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* New Vehicle Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-24 px-4 overflow-y-auto"
              onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-2xl mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-primary">Neues Fahrzeug einstellen</h2>
                  <button onClick={() => setShowForm(false)} className="p-2 hover:bg-bg-soft rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Marke *</label>
                      <select value={form.marke} onChange={e => setForm(f => ({ ...f, marke: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent">
                        <option value="">Marke wählen</option>
                        {marken.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Modell *</label>
                      <input type="text" value={form.modell} onChange={e => setForm(f => ({ ...f, modell: e.target.value }))} placeholder="z.B. Golf, A4, C-Klasse" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Baujahr</label>
                      <input type="number" value={form.baujahr} onChange={e => setForm(f => ({ ...f, baujahr: e.target.value }))} placeholder="z.B. 2022" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Kilometerstand</label>
                      <input type="number" value={form.kilometerstand} onChange={e => setForm(f => ({ ...f, kilometerstand: e.target.value }))} placeholder="z.B. 45000" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Preis (€)</label>
                      <input type="number" value={form.preis} onChange={e => setForm(f => ({ ...f, preis: e.target.value }))} placeholder="z.B. 28900" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Kraftstoff</label>
                      <select value={form.kraftstoff} onChange={e => setForm(f => ({ ...f, kraftstoff: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent">
                        <option value="">Wählen</option>
                        {kraftstoffe.map(k => <option key={k} value={k}>{k}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Getriebe</label>
                      <select value={form.getriebe} onChange={e => setForm(f => ({ ...f, getriebe: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent">
                        <option value="">Wählen</option>
                        {getriebeTypen.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Farbe</label>
                      <input type="text" value={form.farbe} onChange={e => setForm(f => ({ ...f, farbe: e.target.value }))} placeholder="z.B. Schwarz Metallic" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Beschreibung</label>
                    <textarea value={form.beschreibung} onChange={e => setForm(f => ({ ...f, beschreibung: e.target.value }))} rows={3} placeholder="z.B. Scheckheftgepflegt, Winterreifen dabei, ..." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent resize-none" />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Fotos (max. 8)</label>
                    <div className="flex flex-wrap gap-3">
                      {pendingImages.map((img, i) => (
                        <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden group border border-border">
                          <img src={img.preview} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={() => removeImage(i)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <X className="w-5 h-5 text-white" />
                          </button>
                        </div>
                      ))}
                      {pendingImages.length < 8 && (
                        <label className="w-24 h-24 rounded-lg border-2 border-dashed border-border hover:border-accent flex flex-col items-center justify-center cursor-pointer transition-colors">
                          <Upload className="w-5 h-5 text-text-light mb-1" />
                          <span className="text-xs text-text-light">Foto</span>
                          <input type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={!form.marke || !form.modell || submitting}
                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {uploadingImages ? 'Bilder hochladen...' : 'Wird eingestellt...'}
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Fahrzeug einstellen
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vehicle List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20">
            <Car className="w-16 h-16 text-text-light/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-muted mb-2">Noch keine Fahrzeuge</h3>
            <p className="text-text-light text-sm mb-6">Stellen Sie Ihr erstes Fahrzeug ein.</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Erstes Fahrzeug einstellen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map(vehicle => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl border border-border overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[16/10] bg-bg-muted flex items-center justify-center relative">
                  {vehicle.bilder.length > 0 ? (
                    <img src={vehicle.bilder[0]} alt={`${vehicle.marke} ${vehicle.modell}`} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-text-light/30" />
                  )}
                  {vehicle.bilder.length > 1 && (
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                      +{vehicle.bilder.length - 1} Fotos
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-primary">{vehicle.marke} {vehicle.modell}</h3>
                      <div className="flex flex-wrap gap-x-3 text-xs text-text-muted mt-1">
                        {vehicle.baujahr && <span>EZ {vehicle.baujahr}</span>}
                        {vehicle.kilometerstand && <span>{Number(vehicle.kilometerstand).toLocaleString('de-DE')} km</span>}
                        {vehicle.kraftstoff && <span>{vehicle.kraftstoff}</span>}
                      </div>
                    </div>
                    {vehicle.preis && (
                      <span className="text-lg font-bold text-accent whitespace-nowrap">
                        {Number(vehicle.preis).toLocaleString('de-DE')} €
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-text-light">
                      {new Date(vehicle.createdAt).toLocaleDateString('de-DE')}
                    </span>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      disabled={deleting === vehicle.id}
                      className={cn(
                        'flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors',
                        'text-error/70 hover:text-error hover:bg-error/10'
                      )}
                    >
                      {deleting === vehicle.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      Löschen
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
