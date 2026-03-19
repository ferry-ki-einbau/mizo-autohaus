import { motion } from 'framer-motion'
import { Car, Shield, CreditCard, Award, Phone, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import AnkaufForm from '@/components/AnkaufForm'

const vorteile = [
  { icon: Shield, title: 'Geprüfte Qualität', text: 'Jedes Fahrzeug wird technisch geprüft und aufbereitet.' },
  { icon: CreditCard, title: 'Finanzierung möglich', text: 'Flexible Raten — wir finden die passende Lösung.' },
  { icon: Award, title: 'Garantie inklusive', text: 'Bis zu 24 Monate Garantie auf unsere Fahrzeuge.' },
  { icon: Car, title: 'Inzahlungnahme', text: 'Altes Auto direkt auf den Kaufpreis anrechnen.' },
]

export default function GebrauchtwagenHannoverPage() {
  return (
    <div>
      <section className="relative text-white py-16 lg:py-24 overflow-hidden"><div className="absolute inset-0"><img src="/images/hero-autohaus.jpg" alt="" className="w-full h-full object-cover object-bottom" loading="eager" /><div className="absolute inset-0 bg-primary/85" /></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Gebrauchtwagen in <span className="text-accent">Hannover</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Entdecken Sie geprüfte Gebrauchtwagen bei Mizo Autohaus. Alle Fahrzeuge mit Garantie, flexible Finanzierung und Inzahlungnahme möglich.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/#fahrzeuge" className="bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all no-underline flex items-center gap-2">
                Fahrzeuge ansehen <ArrowRight className="w-5 h-5" />
              </a>
              <a href="tel:+4915161861808" className="border-2 border-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold no-underline">
                0151 618 618 08
              </a>
            </div>
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
            <SectionHeading tag="Gebrauchtwagen kaufen" title="Ihr Autohändler in Hannover" />
            <p>
              Bei <strong className="text-primary">Mizo Autohaus</strong> finden Sie eine wechselnde Auswahl an hochwertigen Gebrauchtwagen aller Marken. Ob Mercedes-Benz, BMW, Audi, Volkswagen oder Tesla — wir bieten Fahrzeuge für jeden Geschmack und jedes Budget.
            </p>
            <p>
              Jedes Fahrzeug in unserem Bestand wird vor dem Verkauf <strong className="text-primary">technisch geprüft und professionell aufbereitet</strong>. Sie kaufen bei uns keine Katze im Sack, sondern ein Fahrzeug mit transparenter Historie und bis zu 24 Monaten Garantie.
            </p>
            <h3 className="text-xl font-bold text-primary pt-4">Finanzierung und Inzahlungnahme</h3>
            <p>
              Sie möchten Ihren Gebrauchtwagen finanzieren? Kein Problem. Wir bieten flexible Finanzierungslösungen mit attraktiven Konditionen. Außerdem nehmen wir Ihr altes Fahrzeug gerne in Zahlung — den Wert rechnen wir direkt auf den Kaufpreis an.
            </p>
            <h3 className="text-xl font-bold text-primary pt-4">Standort und Öffnungszeiten</h3>
            <p>
              Besuchen Sie uns an der <strong className="text-primary">Vahrenwalder Straße 35, 30165 Hannover</strong>. Wir sind montags bis freitags von 09:00 bis 18:00 Uhr und samstags von 09:00 bis 16:00 Uhr für Sie da. Wir freuen uns auf Ihren Besuch!
            </p>
          </div>
        </div>
      </section>

      <AnkaufForm />

      <section className="py-12 bg-accent">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ihr Traumauto ist dabei?</h2>
          <p className="text-white/80 mb-6">Rufen Sie uns an oder kommen Sie vorbei. Wir beraten Sie gerne persönlich.</p>
          <a href="tel:+4915161861808" className="inline-flex items-center gap-2 bg-white text-accent px-8 py-4 rounded-xl text-lg font-semibold no-underline hover:bg-white/90 transition-colors">
            <Phone className="w-5 h-5" /> 0151 618 618 08
          </a>
        </div>
      </section>
    </div>
  )
}
