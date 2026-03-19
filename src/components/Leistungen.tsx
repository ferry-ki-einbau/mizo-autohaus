import { motion } from 'framer-motion'
import { Car, HandCoins, CreditCard, Shield, ArrowLeftRight, FileCheck } from 'lucide-react'
import SectionHeading from './SectionHeading'

const services = [
  {
    icon: HandCoins,
    title: 'Fahrzeug-Ankauf',
    description: 'Wir kaufen Ihr Fahrzeug zu fairen Preisen. Schnelle Bewertung, sofortige Auszahlung — ohne Umwege.',
  },
  {
    icon: Car,
    title: 'Fahrzeug-Verkauf',
    description: 'Große Auswahl an geprüften Gebrauchtwagen. Alle Fahrzeuge sind technisch geprüft und sofort verfügbar.',
  },
  {
    icon: CreditCard,
    title: 'Finanzierung',
    description: 'Flexible Finanzierungslösungen für jedes Budget. Wir finden die passende Rate für Sie.',
  },
  {
    icon: Shield,
    title: 'Garantie',
    description: 'Bis zu 24 Monate Garantie auf unsere Fahrzeuge. Fahren Sie sorgenfrei mit Mizo Autohaus.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Inzahlungnahme',
    description: 'Tauschen Sie Ihr altes Fahrzeug gegen ein neues. Wir rechnen den Wert direkt an.',
  },
  {
    icon: FileCheck,
    title: 'Zulassungsdienst',
    description: 'Online-Zulassung in nur 10 Minuten. Wir erledigen den Papierkram — Sie fahren los.',
  },
]

export default function Leistungen() {
  return (
    <section id="leistungen" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Unsere Leistungen"
          title="Alles rund ums Auto"
          description="Von Ankauf über Finanzierung bis zur Zulassung — bei Mizo Autohaus erhalten Sie den kompletten Service aus einer Hand."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group p-6 rounded-2xl border border-border bg-white hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">{service.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
