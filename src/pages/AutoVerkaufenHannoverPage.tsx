import { motion } from 'framer-motion'
import { ArrowDown, Shield, Clock, Banknote, CheckCircle, MapPin, Phone, Star } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import AnkaufForm from '@/components/AnkaufForm'

const vorteile = [
  'Kostenlose Fahrzeugbewertung vor Ort',
  'Sofortauszahlung am selben Tag',
  'Alle Marken und Modelle willkommen',
  'Auch Fahrzeuge ohne TÜV oder mit Schäden',
  'Kostenlose Abmeldung inklusive',
  'Kein Vermittler — direkt vom Inhaber',
  'Keine versteckten Gebühren',
  'Über 500 zufriedene Verkäufer',
]

export default function AutoVerkaufenHannoverPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white py-16 lg:py-24 overflow-hidden"><div className="absolute inset-0"><img src="/images/hero-new-desktop.webp" alt="Auto verkaufen in Hannover — Mizo Autohaus Fahrzeuge" className="w-full h-full object-cover object-bottom" loading="eager" /><div className="absolute inset-0 bg-primary/85" /></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent-light px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" /> Hannover & Umgebung
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Auto verkaufen in <span className="text-accent">Hannover</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Sie möchten Ihr Auto in Hannover verkaufen? Bei Mizo Autohaus erhalten Sie innerhalb von 24 Stunden ein faires Angebot — kostenlos, unverbindlich und ohne versteckte Kosten.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/#ankauf" className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all no-underline flex items-center gap-2">
                Jetzt Auto bewerten lassen
                <ArrowDown className="w-5 h-5" />
              </a>
              <a href="tel:+4915161861808" className="border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold no-underline">
                0151 618 618 08
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-6 bg-bg-soft border-b border-border">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-text-muted">
          <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Seriöser Ankauf</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> Angebot in 24h</span>
          <span className="flex items-center gap-2"><Banknote className="w-4 h-4 text-accent" /> Sofortauszahlung</span>
          <span className="flex items-center gap-2"><Star className="w-4 h-4 text-accent" /> 500+ zufriedene Kunden</span>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-6">
              <SectionHeading tag="So funktioniert's" title="Auto verkaufen — einfach und fair" center={false} />
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  Der Autoverkauf kann stressig sein: Inserate schalten, Probefahrten organisieren, mit Interessenten verhandeln. Bei <strong className="text-primary">Mizo Autohaus in Hannover</strong> geht das einfacher.
                </p>
                <p>
                  Füllen Sie unser kurzes Online-Formular aus oder rufen Sie uns an. Wir bewerten Ihr Fahrzeug kostenlos und machen Ihnen innerhalb von 24 Stunden ein faires Angebot. Wenn der Preis passt, zahlen wir sofort aus — am selben Tag.
                </p>
                <p>
                  Wir kaufen <strong className="text-primary">alle Marken und Modelle</strong>: PKW, SUV, Transporter, Sportwagen. Auch Fahrzeuge mit hohem Kilometerstand, ohne TÜV oder mit Unfallschäden. Fragen Sie einfach an — wir machen Ihnen ein Angebot.
                </p>
                <h3 className="text-xl font-bold text-primary pt-4">Warum Ihr Auto bei uns verkaufen?</h3>
                <p>
                  Im Gegensatz zu Online-Ankäufern sehen wir uns Ihr Fahrzeug persönlich an. Kein Lockpreis, der später nach unten korrigiert wird. Was wir anbieten, das zahlen wir auch. Seit Jahren sind wir als fairer Ankäufer in Hannover bekannt.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-bg-soft rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold text-primary mb-4">Ihre Vorteile</h3>
                <ul className="space-y-3">
                  {vorteile.map(v => (
                    <li key={v} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {v}
                    </li>
                  ))}
                </ul>
                <a href="/#ankauf" className="mt-6 block bg-accent hover:bg-accent-dark text-white text-center py-3 rounded-xl font-semibold transition-colors no-underline">
                  Jetzt Fahrzeug anbieten
                </a>
                <a href="tel:+4915161861808" className="mt-3 flex items-center justify-center gap-2 text-sm text-accent font-medium no-underline">
                  <Phone className="w-4 h-4" /> 0151 618 618 08
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnkaufForm />

      {/* Lokales SEO */}
      <section className="py-16 bg-bg-soft">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading tag="Standort" title="Autoankauf in Hannover und Umgebung" />
          <div className="text-text-muted leading-relaxed space-y-4 max-w-3xl mx-auto">
            <p>
              Unser Autohaus befindet sich an der <strong className="text-primary">Vahrenwalder Straße 35 in 30165 Hannover</strong>, zentral gelegen und gut erreichbar. Wir kaufen Fahrzeuge aus dem gesamten Raum Hannover an — inklusive Langenhagen, Laatzen, Garbsen, Lehrte, Burgdorf, Barsinghausen, Wunstorf und der gesamten Region Hannover.
            </p>
            <p>
              <strong className="text-primary">Öffnungszeiten:</strong> Montag bis Freitag 09:00 – 18:00 Uhr, Samstag 09:00 – 16:00 Uhr. Kommen Sie einfach vorbei oder vereinbaren Sie einen Termin telefonisch.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
