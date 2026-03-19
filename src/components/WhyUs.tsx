import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

const reasons = [
  {
    title: 'Faire Bewertung ohne Tricks',
    description: 'Keine Lockangebote, keine versteckten Abzüge. Wir nennen Ihnen einen ehrlichen Preis — und stehen dazu.',
  },
  {
    title: 'Sofortauszahlung am selben Tag',
    description: 'Bringen Sie Ihr Fahrzeug vorbei, wir prüfen es und zahlen direkt aus. Kein Warten, kein Hin und Her.',
  },
  {
    title: 'Alle Marken, alle Zustände',
    description: 'Ob Neuwagen oder Fahrzeug mit Gebrauchsspuren — wir kaufen jedes Auto. Auch Unfallfahrzeuge und Fahrzeuge ohne TÜV.',
  },
  {
    title: 'Kostenlose Abmeldung inklusive',
    description: 'Wir übernehmen den kompletten Papierkram — Abmeldung, Ummeldung, Versicherungskündigung. Sie müssen nichts tun.',
  },
  {
    title: 'Über 500 zufriedene Verkäufer',
    description: 'Unsere Kunden empfehlen uns weiter, weil sie fair behandelt wurden. Das ist unser bestes Marketing.',
  },
  {
    title: 'Direkt vom Inhaber betreut',
    description: 'Kein Callcenter, kein Sachbearbeiter. Sie sprechen immer direkt mit uns — persönlich und verbindlich.',
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Warum Mizo Autohaus?"
          title="6 Gründe, warum Kunden uns vertrauen"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex gap-4"
            >
              <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary text-lg">{reason.title}</h3>
                <p className="text-text-muted text-sm mt-1 leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-lg hover:shadow-accent/20"
          >
            Jetzt Fahrzeug anbieten
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
