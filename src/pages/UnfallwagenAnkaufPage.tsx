import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Phone, ArrowDown } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import AnkaufForm from '@/components/AnkaufForm'

const kaufenWir = [
  'Unfallfahrzeuge (repariert und nicht repariert)',
  'Fahrzeuge ohne TÜV',
  'Fahrzeuge mit Motorschaden',
  'Fahrzeuge mit Getriebeschaden',
  'Fahrzeuge mit hoher Laufleistung',
  'Nicht fahrbereite Fahrzeuge',
  'Fahrzeuge mit Hagelschaden',
  'Fahrzeuge nach Totalschaden',
]

export default function UnfallwagenAnkaufPage() {
  return (
    <div>
      <section className="relative text-white py-16 lg:py-24 overflow-hidden"><div className="absolute inset-0"><img src="/images/hero-autohaus.jpg" alt="" className="w-full h-full object-cover object-bottom" loading="eager" /><div className="absolute inset-0 bg-primary/85" /></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent-light px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" /> Auch Unfallfahrzeuge
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Unfallwagen <span className="text-accent">Ankauf</span> Hannover
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Ihr Auto hatte einen Unfall? Wir kaufen es trotzdem. Fair bewertet, schnell ausgezahlt — auch bei Totalschaden, Motorschaden oder ohne TÜV.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/#ankauf" className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all no-underline flex items-center gap-2">
                Unfallwagen bewerten <ArrowDown className="w-5 h-5" />
              </a>
              <a href="tel:+4915161861808" className="border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold no-underline">
                0151 618 618 08
              </a>
              <AnkaufForm />
    </div>
          </motion.div>
          <AnkaufForm />
    </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6 text-text-muted leading-relaxed">
              <SectionHeading tag="Unfallwagen verkaufen" title="Wir kaufen Ihr Unfallfahrzeug" center={false} />
              <p>
                Ein Unfall ist ärgerlich genug — der Verkauf des beschädigten Fahrzeugs sollte nicht auch noch zur Last werden. Bei <strong className="text-primary">Mizo Autohaus</strong> kaufen wir Unfallfahrzeuge aller Art zu fairen Preisen an.
              </p>
              <p>
                Egal ob <strong className="text-primary">leichter Blechschaden, Motorschaden, Getriebeschaden oder Totalschaden</strong> — wir bewerten Ihr Fahrzeug ehrlich und machen Ihnen ein faires Angebot. Auch Fahrzeuge ohne TÜV oder nicht fahrbereite Autos sind bei uns willkommen.
              </p>
              <h3 className="text-xl font-bold text-primary pt-4">Wie funktioniert der Unfallwagen-Ankauf?</h3>
              <p>
                Senden Sie uns Bilder und Infos über unser Online-Formular. Je mehr Details wir haben (Art des Schadens, Fotos, Gutachten), desto schneller können wir Ihnen ein Angebot machen. In den meisten Fällen erhalten Sie innerhalb von 24 Stunden eine Rückmeldung.
              </p>
              <p>
                Wir kümmern uns auch um die <strong className="text-primary">Abmeldung und den gesamten Papierkram</strong>. Sie müssen nichts weiter tun als Ihr Fahrzeug vorbeizubringen.
              </p>
              <AnkaufForm />
    </div>

            <div>
              <div className="bg-bg-soft rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold text-primary mb-4">Das kaufen wir an:</h3>
                <ul className="space-y-3">
                  {kaufenWir.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-accent/10 rounded-xl">
                  <p className="text-sm font-semibold text-primary mb-1">Schnell-Bewertung</p>
                  <p className="text-xs text-text-muted mb-3">Schicken Sie uns Fotos vom Schaden — wir melden uns innerhalb von 24h.</p>
                  <a href="/#ankauf" className="block bg-accent hover:bg-accent-dark text-white text-center py-3 rounded-lg font-semibold transition-colors no-underline text-sm">
                    Jetzt Unfallwagen anbieten
                  </a>
                  <AnkaufForm />
    </div>
                <a href="tel:+4915161861808" className="mt-3 flex items-center justify-center gap-2 text-sm text-accent font-medium no-underline">
                  <Phone className="w-4 h-4" /> 0151 618 618 08
                </a>
                <AnkaufForm />
    </div>
              <AnkaufForm />
    </div>
            <AnkaufForm />
    </div>
          <AnkaufForm />
    </div>
      </section>
      <AnkaufForm />
    </div>
  )
}
