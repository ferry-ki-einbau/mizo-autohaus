import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, Loader2, Check } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'

export default function KontaktPage() {
  const [data, setData] = useState({ name: '', telefon: '', email: '', nachricht: '', website: '' })
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
        body: JSON.stringify({ type: 'kontakt', ...data }),
      })
      if (res.ok) setSubmitted(true)
    } catch { /* UI handles */ }
    setSubmitting(false)
  }

  return (
    <div className="pt-8">
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold">Kontakt</h1>
            <p className="mt-4 text-lg text-white/70">Wir freuen uns auf Ihre Nachricht.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <SectionHeading tag="So erreichen Sie uns" title="Mizo Autohaus" center={false} />
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Adresse', value: 'Vahrenwalder Str. 35\n30165 Hannover' },
                { icon: Phone, label: 'Mobil', value: '0151 618 618 08', href: 'tel:+4915161861808' },
                { icon: Phone, label: 'Festnetz', value: '0511 374 36 01', href: 'tel:+495113743601' },
                { icon: Mail, label: 'E-Mail', value: 'info@mizo-autohaus.de', href: 'mailto:info@mizo-autohaus.de' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-primary hover:text-accent transition-colors no-underline">{item.value}</a>
                    ) : (
                      <p className="font-medium text-primary whitespace-pre-line">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">Öffnungszeiten</p>
                  <p className="font-medium text-primary">Mo – Fr: 09:00 – 18:00</p>
                  <p className="font-medium text-primary">Sa: 09:00 – 16:00</p>
                  <p className="text-text-muted text-sm">So: Geschlossen</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-2xl overflow-hidden h-[250px] border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.8!2d9.738!3d52.394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVahrenwalder+Str.+35%2C+30165+Hannover!5e0!3m2!1sde!2sde!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Mizo Autohaus Standort"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <SectionHeading tag="Schreiben Sie uns" title="Nachricht senden" center={false} />

            {submitted ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-12 shadow-lg text-center border border-border">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Nachricht gesendet!</h3>
                <p className="text-text-muted">Wir melden uns schnellstmöglich bei Ihnen.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={e => setData(d => ({ ...d, website: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Name *</label>
                  <input type="text" required value={data.name} onChange={e => setData(d => ({ ...d, name: e.target.value }))} placeholder="Ihr Name" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Telefon *</label>
                    <input type="tel" required value={data.telefon} onChange={e => setData(d => ({ ...d, telefon: e.target.value }))} placeholder="0151..." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">E-Mail</label>
                    <input type="email" value={data.email} onChange={e => setData(d => ({ ...d, email: e.target.value }))} placeholder="ihre@email.de" className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Nachricht *</label>
                  <textarea required value={data.nachricht} onChange={e => setData(d => ({ ...d, nachricht: e.target.value }))} rows={5} placeholder="Ihre Nachricht..." className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50">
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {submitting ? 'Wird gesendet...' : 'Nachricht senden'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
