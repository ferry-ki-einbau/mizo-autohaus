import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock, LogOut, Plus, Trash2, Car, Loader2, X, Upload,
  Image as ImageIcon, Check, Sparkles, Pencil
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
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [uploadingImages, setUploadingImages] = useState(false)

  // New vehicle form
  const [form, setForm] = useState({
    marke: '', modell: '', baujahr: '', kilometerstand: '',
    preis: '', kraftstoff: '', getriebe: '', farbe: '', beschreibung: '',
    zusatzinfos: '',
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
      const res = await fetch(`/api/admin/vehicles?t=${Date.now()}`)
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
    const newImages = Array.from(files).slice(0, 20 - pendingImages.length).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setPendingImages(prev => [...prev, ...newImages].slice(0, 20))
  }

  const generateDescription = () => {
    const { marke, modell, baujahr, kilometerstand, kraftstoff, getriebe, farbe, zusatzinfos } = form
    if (!marke || !modell) return

    const parts: string[] = []
    const info = zusatzinfos.toLowerCase()
    const km = kilometerstand ? Number(kilometerstand).toLocaleString('de-DE') : ''

    // Eröffnungssatz — variiert je nach Infos
    if (farbe && baujahr) {
      parts.push(`Zum Verkauf steht ein ${marke} ${modell} aus ${baujahr} in der Farbe ${farbe}.`)
    } else if (baujahr) {
      parts.push(`Wir bieten einen gepflegten ${marke} ${modell} (Baujahr ${baujahr}) zum Verkauf an.`)
    } else {
      parts.push(`Zum Verkauf steht ein ${marke} ${modell} in gutem Zustand.`)
    }

    // Technische Details als Fließtext
    if (km || kraftstoff || getriebe) {
      const details: string[] = []
      if (km) details.push(`einem Kilometerstand von ${km} km`)
      if (kraftstoff) details.push(`${kraftstoff}-Antrieb`)
      if (getriebe) details.push(`${getriebe}`)
      parts.push(`Das Fahrzeug überzeugt mit ${details.join(', ')}.`)
    }

    // Zusatzinfos analysieren
    const istUnfall = info.includes('unfall') || info.includes('crash')
    const istMotorschaden = info.includes('motorschaden') || info.includes('motor defekt') || info.includes('motordefekt')
    const hatMaengel = info.includes('mangel') || info.includes('mängel') || info.includes('rost') || info.includes('delle') || info.includes('kratzer')
    const mehrereHand = info.match(/(\d)\.\s*hand/)
    const hatTuev = info.includes('tüv neu') || info.includes('hu neu') || info.includes('tuev neu')
    const keinTuev = info.includes('kein tüv') || info.includes('ohne tüv') || info.includes('tüv abgelaufen')
    const scheckheft = info.includes('scheckheft') || info.includes('serviceheft')

    // Ausstattung erkennen
    const features: string[] = []
    if (info.includes('navi') || info.includes('navigation')) features.push('Navigationssystem')
    if (info.includes('leder')) features.push('Lederausstattung')
    if (info.includes('sitzheizung')) features.push('Sitzheizung')
    if (info.includes('panorama')) features.push('Panorama-Schiebedach')
    if (info.includes('xenon')) features.push('Xenon-Scheinwerfer')
    if (info.includes('led')) features.push('LED-Scheinwerfer')
    if (info.includes('kamera') || info.includes('rückfahr')) features.push('Rückfahrkamera')
    if (info.includes('standheizung')) features.push('Standheizung')
    if (info.includes('tempomat') || info.includes('cruise')) features.push('Tempomat')
    if (info.includes('einparkhilfe') || info.includes('pdc')) features.push('Einparkhilfe')
    if (info.includes('alufelgen') || info.includes('alu')) features.push('Alufelgen')
    if (info.includes('anhängerkupplung') || info.includes('ahk')) features.push('Anhängerkupplung')
    if (info.includes('winterreifen')) features.push('Winterreifen vorhanden')
    if (info.includes('klimaautomatik')) features.push('Klimaautomatik')
    if (info.includes('klima') && !info.includes('klimaautomatik')) features.push('Klimaanlage')

    // Zustandsbeschreibung
    if (istMotorschaden) {
      parts.push('Wichtiger Hinweis: Das Fahrzeug hat einen Motorschaden und wird im aktuellen Zustand verkauft. Der Preis ist entsprechend kalkuliert. Ideal für Bastler, KFZ-Werkstätten oder als Teilespender — die restlichen Komponenten sind in gutem Zustand.')
    } else if (istUnfall) {
      parts.push('Transparenz-Hinweis: Es handelt sich um ein Unfallfahrzeug. Wir verkaufen ehrlich und offen — der Zustand spiegelt sich im fairen Preis wider. Alle Details besprechen wir gerne persönlich mit Ihnen.')
    } else if (hatMaengel) {
      parts.push('Das Fahrzeug weist altersbedingte Gebrauchsspuren auf. Wir legen Wert auf Transparenz — was Sie sehen, ist was Sie bekommen. Der Preis ist fair kalkuliert und berücksichtigt den aktuellen Zustand.')
    } else {
      // Positive Beschreibung
      const positiv = [
        'Das Fahrzeug befindet sich in einem gepflegten Gesamtzustand und wurde regelmäßig gewartet.',
        'Technisch ist das Fahrzeug einwandfrei — alle Komponenten funktionieren zuverlässig.',
        'Der Innenraum ist sauber und gepflegt, das Fahrzeug stammt aus einem Nichtraucher-Haushalt.',
        'Das Fahrzeug ist sofort einsatzbereit und kann direkt mitgenommen werden.',
      ]
      const shuffled = [...positiv].sort(() => Math.random() - 0.5)
      parts.push(shuffled.slice(0, 2).join(' '))
    }

    // Vorbesitzer
    if (mehrereHand) {
      parts.push(`Das Fahrzeug ist aus ${mehrereHand[1]}. Hand.`)
    }

    // Scheckheft
    if (scheckheft) {
      parts.push('Scheckheftgepflegt mit lückenloser Wartungshistorie.')
    }

    // TÜV
    if (hatTuev) {
      parts.push('TÜV/HU ist frisch und neu abgenommen.')
    } else if (keinTuev) {
      parts.push('Das Fahrzeug wird ohne gültige HU/TÜV-Abnahme verkauft.')
    }

    // Ausstattung
    if (features.length > 0) {
      parts.push(`Ausstattungshighlights: ${features.join(', ')}.`)
    }

    // Restliche Zusatzinfos
    const erkannt = istMotorschaden || istUnfall || hatMaengel || mehrereHand || hatTuev || keinTuev || scheckheft || features.length > 0
    if (zusatzinfos && !erkannt) {
      parts.push(zusatzinfos.charAt(0).toUpperCase() + zusatzinfos.slice(1) + (zusatzinfos.endsWith('.') ? '' : '.'))
    }

    // Abschluss
    parts.push('Bei Mizo Autohaus kaufen Sie transparent und fair. Flexible Finanzierung und Inzahlungnahme Ihres alten Fahrzeugs sind selbstverständlich möglich. Vereinbaren Sie jetzt eine unverbindliche Probefahrt — wir freuen uns auf Sie!')

    setForm(f => ({ ...f, beschreibung: parts.join('\n\n') }))
  }

  const removeImage = (index: number) => {
    setPendingImages(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  // Bild komprimieren: max 1200px, JPEG 70% → aus 5MB werden ~150KB
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxPx = 1200
        let { width, height } = img
        if (width > maxPx || height > maxPx) {
          const ratio = Math.min(maxPx / width, maxPx / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.7))
      }
      img.onerror = () => {
        // Fallback: Original als base64
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      }
      img.src = URL.createObjectURL(file)
    })
  }

  const uploadImage = async (file: File): Promise<string> => {
    // Komprimieren vor Upload
    const compressed = await compressImage(file)
    const base64 = compressed.split(',')[1]

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${password}`,
      },
      body: JSON.stringify({
        filename: file.name.replace(/\.\w+$/, '.jpg'),
        contentType: 'image/jpeg',
        data: base64,
      }),
    })
    if (!res.ok) throw new Error('Upload failed')
    const { url } = await res.json()
    return url
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
      setForm({ marke: '', modell: '', baujahr: '', kilometerstand: '', preis: '', kraftstoff: '', getriebe: '', farbe: '', beschreibung: '', zusatzinfos: '' })
      pendingImages.forEach(img => URL.revokeObjectURL(img.preview))
      setPendingImages([])
      setShowForm(false)
      // Kurz warten damit Blob-Cache aktualisiert ist
      await new Promise(r => setTimeout(r, 1500))
      await fetchVehicles()
    } catch {
      alert('Fehler beim Einstellen. Bitte versuche es erneut.')
    }

    setSubmitting(false)
  }

  const startEdit = (vehicle: Vehicle) => {
    setForm({
      marke: vehicle.marke,
      modell: vehicle.modell,
      baujahr: vehicle.baujahr,
      kilometerstand: vehicle.kilometerstand,
      preis: vehicle.preis,
      kraftstoff: vehicle.kraftstoff,
      getriebe: vehicle.getriebe,
      farbe: vehicle.farbe,
      beschreibung: vehicle.beschreibung,
      zusatzinfos: '',
    })
    setEditingId(vehicle.id)
    setPendingImages([])
    setShowForm(true)
  }

  const handleUpdate = async () => {
    if (!editingId || !form.marke || !form.modell || submitting) return
    setSubmitting(true)

    try {
      // Upload new images if any
      let bildUrls: string[] = []
      if (pendingImages.length > 0) {
        setUploadingImages(true)
        bildUrls = await Promise.all(pendingImages.map(img => uploadImage(img.file)))
        setUploadingImages(false)
      }

      const updateData: Record<string, unknown> = { ...form }
      delete updateData.zusatzinfos
      if (bildUrls.length > 0) {
        // Bestehende Bilder + neue Bilder
        const existing = vehicles.find(v => v.id === editingId)?.bilder || []
        updateData.bilder = [...existing, ...bildUrls]
      }

      const res = await fetch(`/api/admin/vehicles?id=${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`,
        },
        body: JSON.stringify(updateData),
      })

      if (!res.ok) throw new Error('Update failed')

      setForm({ marke: '', modell: '', baujahr: '', kilometerstand: '', preis: '', kraftstoff: '', getriebe: '', farbe: '', beschreibung: '', zusatzinfos: '' })
      pendingImages.forEach(img => URL.revokeObjectURL(img.preview))
      setPendingImages([])
      setEditingId(null)
      setShowForm(false)
      await new Promise(r => setTimeout(r, 1500))
      await fetchVehicles()
    } catch {
      alert('Fehler beim Aktualisieren.')
    }

    setSubmitting(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Fahrzeug wirklich löschen?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/vehicles?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${password}` },
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert(`Fehler beim Löschen: ${err.error || res.status}`)
        setDeleting(null)
        return
      }
      // Delay damit Blob-Cache aktualisiert ist
      await new Promise(r => setTimeout(r, 1500))
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
                  <h2 className="text-xl font-bold text-primary">{editingId ? 'Fahrzeug bearbeiten' : 'Neues Fahrzeug einstellen'}</h2>
                  <button onClick={() => { setShowForm(false); setEditingId(null) }} className="p-2 hover:bg-bg-soft rounded-lg">
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
                    <label className="block text-sm font-medium text-text mb-1">Zusatzinfos für KI-Text</label>
                    <textarea value={form.zusatzinfos} onChange={e => setForm(f => ({ ...f, zusatzinfos: e.target.value }))} rows={2} placeholder="z.B. Motorschaden, 3. Hand, Navi, Leder, Sitzheizung, Panoramadach, Rost an Schweller, TÜV neu..." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent resize-none text-sm" />
                    <p className="text-[11px] text-text-light mt-1">Je mehr Infos, desto besser der generierte Text. Stichworte reichen.</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-text">Beschreibung</label>
                      <button
                        type="button"
                        onClick={generateDescription}
                        disabled={!form.marke || !form.modell}
                        className="flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Text generieren
                      </button>
                    </div>
                    <textarea value={form.beschreibung} onChange={e => setForm(f => ({ ...f, beschreibung: e.target.value }))} rows={3} placeholder="z.B. Scheckheftgepflegt, Winterreifen dabei, ... (oder klicke 'Text generieren')" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent resize-none" />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">Fotos (max. 20)</label>
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
                      {pendingImages.length < 20 && (
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
                    onClick={editingId ? handleUpdate : handleSubmit}
                    disabled={!form.marke || !form.modell || submitting}
                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {uploadingImages ? 'Bilder hochladen...' : editingId ? 'Wird aktualisiert...' : 'Wird eingestellt...'}
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        {editingId ? 'Änderungen speichern' : 'Fahrzeug einstellen'}
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(vehicle)}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors text-accent hover:bg-accent/10"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Bearbeiten
                      </button>
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
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
