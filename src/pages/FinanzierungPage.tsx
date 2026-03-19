import { motion } from 'framer-motion'
import { CreditCard, Phone, Calculator, Percent, Clock } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import AnkaufForm from '@/components/AnkaufForm'

const vorteile = [
  { icon: Percent, title: 'Attraktive Konditionen', text: 'Wir arbeiten mit mehreren Banken — für die beste Rate.' },
  { icon: Calculator, title: 'Individuelle Berechnung', text: 'Laufzeit und Rate an Ihr Budget angepasst.' },
  { icon: Clock, title: 'Schnelle Zusage', text: 'In den meisten Fällen Zusage innerhalb von 24 Stunden.' },
  { icon: CreditCard, title: 'Anzahlung optional', text: 'Auch Finanzierung ohne Anzahlung möglich.' },
]

export default function FinanzierungPage() {
  return (
    <div>
      <section className="relative text-white py-16 lg:py-24 overflow-hidden"><div className="absolute inset-0"><img src="/images/hero-autohaus-desktop.webp" alt="KFZ Finanzierung Hannover — Mizo Autohaus" className="w-full h-full object-cover object-bottom" loading="eager" /><div className="absolute inset-0 bg-primary/85" /></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              KFZ-Finanzierung in <span className="text-accent">Hannover</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Ihr Traumauto zu Ihrer Wunschrate. Flexible Finanzierung bei Mizo Autohaus — individuell berechnet, schnelle Zusage, faire Konditionen.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {vorteile.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-primary mb-1">{v.title}</h3>
                <p className="text-sm text-text-muted">{v.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-text-muted leading-relaxed">
            <SectionHeading tag="Finanzierung" title="So funktioniert die Autofinanzierung" />
            <p>
              Sie haben Ihr Wunschfahrzeug bei uns gefunden, möchten aber nicht den vollen Betrag auf einmal zahlen? Kein Problem. Bei <strong className="text-primary">Mizo Autohaus</strong> bieten wir Ihnen eine individuelle KFZ-Finanzierung an.
            </p>
            <h3 className="text-xl font-bold text-primary pt-4">In 3 Schritten zur Finanzierung</h3>
            <ol className="space-y-4">
              {[
                { title: 'Fahrzeug auswählen', desc: 'Finden Sie Ihr Wunschfahrzeug in unserem Bestand oder lassen Sie sich beraten.' },
                { title: 'Finanzierung berechnen', desc: 'Gemeinsam berechnen wir die passende Rate. Sie bestimmen Laufzeit und Anzahlung.' },
                { title: 'Losfahren', desc: 'Nach Zusage der Bank übernehmen wir den Papierkram. Sie fahren mit Ihrem neuen Auto los.' },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                  <div>
                    <strong className="text-primary">{step.title}</strong>
                    <p className="text-sm mt-0.5">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="text-xl font-bold text-primary pt-4">Häufige Fragen zur Finanzierung</h3>
            <div className="space-y-3">
              {[
                { q: 'Welche Unterlagen brauche ich?', a: 'Personalausweis, die letzten drei Gehaltsabrechnungen und Ihre Bankverbindung.' },
                { q: 'Geht Finanzierung auch ohne Anzahlung?', a: 'Ja, in vielen Fällen ist eine Finanzierung ohne Anzahlung möglich.' },
                { q: 'Kann ich vorzeitig ablösen?', a: 'Ja, eine vorzeitige Rückzahlung ist jederzeit möglich.' },
              ].map(faq => (
                <div key={faq.q} className="p-4 bg-bg-soft rounded-xl">
                  <p className="font-semibold text-primary text-sm">{faq.q}</p>
                  <p className="text-sm mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnkaufForm />

      <section className="py-12 bg-accent">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Finanzierung anfragen</h2>
          <p className="text-white/80 mb-6">Lassen Sie uns gemeinsam die passende Rate für Ihr Wunschfahrzeug berechnen.</p>
          <a href="tel:+4915161861808" className="inline-flex items-center gap-2 bg-white text-accent px-8 py-4 rounded-xl text-lg font-semibold no-underline hover:bg-white/90 transition-colors">
            <Phone className="w-5 h-5" /> 0151 618 618 08
          </a>
        </div>
      </section>
    </div>
  )
}
