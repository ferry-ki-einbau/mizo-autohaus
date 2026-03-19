import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Loader2, Upload, Send, Shield, Clock, Phone, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeading from './SectionHeading'
import TrustBadges from './TrustBadges'

interface FormData {
  marke: string
  modell: string
  baujahr: string
  kilometerstand: string
  zustand: string
  tuev: string
  beschreibung: string
  bilder: string[]
  name: string
  telefon: string
  email: string
  website: string
}

const initialData: FormData = {
  marke: '', modell: '', baujahr: '', kilometerstand: '',
  zustand: '', tuev: '', beschreibung: '',
  bilder: [], name: '', telefon: '', email: '', website: '',
}

const marken = [
  'Alfa Romeo', 'Audi', 'BMW', 'Chevrolet', 'Citroën', 'Cupra', 'Dacia',
  'Fiat', 'Ford', 'Honda', 'Hyundai', 'Jaguar', 'Jeep', 'Kia',
  'Land Rover', 'Mazda', 'Mercedes-Benz', 'Mini', 'Mitsubishi',
  'Nissan', 'Opel', 'Peugeot', 'Porsche', 'Renault', 'Seat', 'Skoda',
  'Smart', 'Suzuki', 'Tesla', 'Toyota', 'Volkswagen', 'Volvo', 'Andere'
]
const zustaende = ['Neuwertig', 'Sehr gut', 'Gut (Gebrauchsspuren)', 'Akzeptabel', 'Unfallfahrzeug', 'Defekt']
const tuevOptionen = ['Mehr als 6 Monate', 'Weniger als 6 Monate', 'Abgelaufen', 'Kein TÜV']

async function compressImage(dataUrl: string, maxPx = 800, quality = 0.65): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
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
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => resolve(dataUrl)
    img.src = dataUrl
  })
}

export default function AnkaufForm() {
  const [data, setData] = useState<FormData>(initialData)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const update = (field: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleImages = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const promises = Array.from(files).slice(0, 5).map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = async () => {
          const compressed = await compressImage(reader.result as string)
          resolve(compressed)
        }
        reader.readAsDataURL(file)
      })
    })
    const results = await Promise.all(promises)
    setData(prev => ({ ...prev, bilder: [...prev.bilder, ...results].slice(0, 5) }))
  }, [])

  const removeImage = (index: number) => {
    setData(prev => ({ ...prev, bilder: prev.bilder.filter((_, i) => i !== index) }))
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!data.marke) newErrors.marke = 'Bitte Marke wählen'
    if (!data.name) newErrors.name = 'Bitte Name eingeben'
    if (!data.telefon) newErrors.telefon = 'Bitte Telefon eingeben'
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = formRef.current?.querySelector(`[data-field="${Object.keys(newErrors)[0]}"]`)
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    if (!validate()) return

    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'ankauf', ...data }),
      })
      if (!res.ok) throw new Error('Fehler')
      setSubmitted(true)
    } catch {
      setError('Fehler beim Senden. Bitte rufen Sie uns an: 0151 618 618 08')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="ankauf" className="py-20 bg-bg-soft">
        <div className="max-w-xl mx-auto px-4 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-10 shadow-lg border border-border">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-black text-primary mb-2">Anfrage erhalten!</h3>
            <p className="text-text-muted mb-6">
              Wir prüfen Ihre Angaben und melden uns in der Regel <strong className="text-primary">noch heute</strong> bei Ihnen mit einem fairen Angebot.
            </p>

            <div className="bg-bg-soft rounded-xl p-5 mb-4">
              <p className="text-sm text-text-muted mb-3">Lieber nicht warten? Erreichen Sie uns sofort:</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+4915161861808" className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white py-3 rounded-lg font-bold transition-colors no-underline text-sm">
                  <Phone className="w-4 h-4" /> 0151 618 618 08
                </a>
                <a href="https://wa.me/4915161861808?text=Hallo%2C%20ich%20habe%20gerade%20eine%20Ankauf-Anfrage%20gesendet." target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb855] text-white py-3 rounded-lg font-bold transition-colors no-underline text-sm">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="ankauf" className="py-16 sm:py-24 bg-bg-soft">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="Fahrzeug-Ankauf"
          title="Verkaufen Sie Ihr Fahrzeug"
          description="Kurzes Formular ausfüllen — wir melden uns noch heute mit einem Angebot."
        />

        <motion.form
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl shadow-black/5 p-6 sm:p-8 border border-border"
        >
          {/* Honeypot */}
          <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={e => update('website', e.target.value)} />
          </div>

          {/* Fahrzeug */}
          <p className="text-xs font-bold text-accent uppercase tracking-wider mb-4">Fahrzeug</p>
          {/* Zeile 1: Marke full-width auf Mobile */}
          <div className="mb-3" data-field="marke">
            <select value={data.marke} onChange={e => update('marke', e.target.value)} className={cn(fieldClass, errors.marke && errorClass)}>
              <option value="">Marke *</option>
              {marken.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            {errors.marke && <p className="text-error text-xs mt-1">{errors.marke}</p>}
          </div>
          {/* Zeile 2: Modell + Baujahr + KM */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <input type="text" value={data.modell} onChange={e => update('modell', e.target.value)} placeholder="Modell" className={fieldClass} />
            <input type="text" inputMode="numeric" value={data.baujahr} onChange={e => update('baujahr', e.target.value)} placeholder="Baujahr" className={fieldClass} />
            <input type="text" inputMode="numeric" value={data.kilometerstand} onChange={e => update('kilometerstand', e.target.value)} placeholder="KM-Stand" className={fieldClass} />
          </div>
          {/* Zeile 3: Zustand + TÜV */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-3">
            <select value={data.zustand} onChange={e => update('zustand', e.target.value)} className={fieldClass}>
              <option value="">Zustand</option>
              {zustaende.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
            <select value={data.tuev} onChange={e => update('tuev', e.target.value)} className={fieldClass}>
              <option value="">TÜV</option>
              {tuevOptionen.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <textarea
            value={data.beschreibung}
            onChange={e => update('beschreibung', e.target.value)}
            placeholder="Sonderausstattung, Mängel, Besonderheiten (optional)"
            rows={2}
            className={cn(fieldClass, 'mb-4 resize-none')}
          />

          {/* Foto-Upload */}
          <div className="border-2 border-dashed border-border hover:border-accent/40 rounded-xl p-4 mb-6 transition-colors">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent/10 text-accent text-sm font-bold cursor-pointer hover:bg-accent/20 transition-colors">
                <Upload className="w-4 h-4" />
                Fotos hinzufügen
                <input type="file" accept="image/*" multiple onChange={handleImages} className="hidden" />
              </label>
              <span className="text-xs text-text-light">
                {data.bilder.length > 0 ? `${data.bilder.length}/5 Fotos` : 'Mit Fotos erhalten Sie ein genaueres Angebot'}
              </span>
            </div>
            {data.bilder.length > 0 && (
              <div className="flex gap-2 mt-3">
                {data.bilder.map((src, i) => (
                  <div key={i} className="relative w-14 h-14 rounded-lg overflow-hidden group border border-border">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border my-5" />

          {/* Kontakt */}
          <p className="text-xs font-bold text-accent uppercase tracking-wider mb-4">Kontakt</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div data-field="name">
              <input type="text" value={data.name} onChange={e => update('name', e.target.value)} placeholder="Ihr Name *" className={cn(fieldClass, errors.name && errorClass)} />
              {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
            </div>
            <div data-field="telefon">
              <input type="tel" value={data.telefon} onChange={e => update('telefon', e.target.value)} placeholder="Telefon *" className={cn(fieldClass, errors.telefon && errorClass)} />
              {errors.telefon && <p className="text-error text-xs mt-1">{errors.telefon}</p>}
            </div>
            <input type="email" value={data.email} onChange={e => update('email', e.target.value)} placeholder="E-Mail" className={fieldClass} />
          </div>

          {error && (
            <p className="text-error text-sm bg-error/10 px-4 py-2 rounded-lg mb-4">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base bg-accent hover:bg-accent-dark text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all disabled:opacity-50 hover:scale-[1.01]"
          >
            {submitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Wird gesendet...</>
            ) : (
              <><Send className="w-5 h-5" /> Kostenlose Bewertung anfordern</>
            )}
          </button>

          {/* Trust */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 text-xs text-text-light">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 100% kostenlos</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Antwort heute</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Unverbindlich</span>
          </div>

          <TrustBadges />
        </motion.form>
      </div>
    </section>
  )
}

const fieldClass = 'w-full px-3.5 py-3 sm:py-2.5 rounded-lg border border-border bg-white text-text text-base sm:text-sm focus:border-accent focus:ring-1 focus:ring-accent transition-colors placeholder:text-text-light min-h-[44px]'
const errorClass = 'border-error focus:border-error focus:ring-error'
