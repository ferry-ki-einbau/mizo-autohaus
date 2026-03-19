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
    description: 'Ob Neuwagen oder Fahrzeug mit Gebrauchsspuren — wir kaufen jedes Auto. Auch Unfallfahrzeuge.',
  },
  {
    title: 'Kostenlose Abmeldung inklusive',
    description: 'Wir übernehmen den kompletten Papierkram — Abmeldung, Ummeldung, Versicherungskündigung.',
  },
  {
    title: 'Über 500 zufriedene Verkäufer',
    description: 'Unsere Kunden empfehlen uns weiter, weil sie fair behandelt wurden.',
  },
  {
    title: 'Direkt vom Inhaber betreut',
    description: 'Kein Callcenter, kein Sachbearbeiter. Sie sprechen immer direkt mit uns.',
  },
]

export default function WhyUs() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Warum Mizo Autohaus?"
          title="6 Gründe, warum Kunden uns vertrauen"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 sm:gap-y-8 lg:gap-8 mt-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex gap-4 group lg:p-6 lg:rounded-2xl lg:border lg:border-transparent lg:hover:border-border lg:hover:shadow-lg lg:hover:shadow-black/5 lg:transition-all lg:duration-300"
            >
              <div className="w-8 h-8 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent group-hover:shadow-md group-hover:shadow-accent/20 transition-all duration-300">
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-accent group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-primary text-lg lg:text-xl">{reason.title}</h3>
                <p className="text-text-muted text-sm lg:text-base mt-1 leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 lg:mt-16 text-center"
        >
          <button
            onClick={() => document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-lg lg:text-xl font-bold transition-all hover:shadow-xl hover:shadow-accent/25 hover:scale-[1.02]"
          >
            Jetzt Fahrzeug anbieten
            <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
