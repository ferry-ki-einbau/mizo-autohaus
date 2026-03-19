import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileCheck, Clock, Shield, CheckCircle, Send, Loader2, Check } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'

const steps = [
  { num: '01', title: 'Formular ausfüllen', description: 'Tragen Sie Ihre Fahrzeug- und Halterdaten ein.' },
  { num: '02', title: 'Dokumente hochladen', description: 'Laden Sie die benötigten Unterlagen hoch.' },
  { num: '03', title: 'Bestätigung erhalten', description: 'Wir bearbeiten Ihren Antrag und senden die Bestätigung.' },
  { num: '04', title: 'Kennzeichen abholen', description: 'Holen Sie Ihre neuen Kennzeichen bei uns ab.' },
]

const advantages = [
  { icon: Clock, title: 'In 10 Minuten', description: 'Schneller als jede Zulassungsstelle' },
  { icon: Shield, title: 'Sicher & Legal', description: 'Offizieller Zulassungsdienst' },
  { icon: FileCheck, title: 'Komplett-Service', description: 'Neuzulassung, Ummeldung, Abmeldung' },
]

export default function ZulassungPage() {
  const [data, setData] = useState({
    art: '', name: '', telefon: '', email: '', kennzeichen: '', fahrzeug: '', nachricht: '', website: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (data.website || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/send-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'zulassung', ...data }),
      })
      if (res.ok) setSubmitted(true)
    } catch { /* handled by UI */ }
    setSubmitting(false)
  }

  return (
    <div className="pt-8">
      {/* Hero */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent-light px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <FileCheck className="w-4 h-4" />
              Online-Zulassungsdienst
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Zulassung in <span className="text-accent">10 Minuten</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              Neuzulassung, Ummeldung oder Abmeldung — wir erledigen den Papierkram. Schnell, günstig und ohne Warteschlange.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <adv.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-primary mb-1">{adv.title}</h3>
              <p className="text-sm text-text-muted">{adv.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-bg-soft">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading tag="So funktioniert's" title="In 4 einfachen Schritten" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 bg-white rounded-2xl border border-border"
              >
                <span className="text-4xl font-bold text-accent/20">{step.num}</span>
                <h4 className="font-semibold text-primary mt-2">{step.title}</h4>
                <p className="text-sm text-text-muted mt-1">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <SectionHeading
            tag="Zulassung beauftragen"
            title="Jetzt Antrag stellen"
            description="Füllen Sie das Formular aus und wir kümmern uns um den Rest."
          />

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-12 shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">Antrag gesendet!</h3>
              <p className="text-text-muted">Wir melden uns kurzfristig bei Ihnen.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-4">
              <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={e => setData(d => ({ ...d, website: e.target.value }))} />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Art der Zulassung *</label>
                <select
                  value={data.art}
                  onChange={e => setData(d => ({ ...d, art: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent"
                >
                  <option value="">Bitte wählen</option>
                  <option value="neuzulassung">Neuzulassung</option>
                  <option value="ummeldung">Ummeldung</option>
                  <option value="abmeldung">Abmeldung</option>
                  <option value="kurzzeitkennzeichen">Kurzzeitkennzeichen</option>
                  <option value="saisonkennzeichen">Saisonkennzeichen</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Name *</label>
                  <input type="text" required value={data.name} onChange={e => setData(d => ({ ...d, name: e.target.value }))} placeholder="Ihr Name" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Telefon *</label>
                  <input type="tel" required value={data.telefon} onChange={e => setData(d => ({ ...d, telefon: e.target.value }))} placeholder="0151..." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">E-Mail</label>
                <input type="email" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} placeholder="ihre@email.de" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Kennzeichen</label>
                  <input type="text" value={data.kennzeichen} onChange={e => setData(d => ({ ...d, kennzeichen: e.target.value }))} placeholder="z.B. H-AB 1234" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Fahrzeug</label>
                  <input type="text" value={data.fahrzeug} onChange={e => setData(d => ({ ...d, fahrzeug: e.target.value }))} placeholder="z.B. VW Golf" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Nachricht</label>
                <textarea value={data.nachricht} onChange={e => setData(d => ({ ...d, nachricht: e.target.value }))} rows={3} placeholder="Zusätzliche Informationen..." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent resize-none" />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {submitting ? 'Wird gesendet...' : 'Antrag absenden'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Trust */}
      <section className="py-12 bg-bg-soft">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-text-muted">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-sm">Offizieller Zulassungsdienst — Vahrenwalder Str. 35, 30165 Hannover</span>
          </div>
        </div>
      </section>
    </div>
  )
}