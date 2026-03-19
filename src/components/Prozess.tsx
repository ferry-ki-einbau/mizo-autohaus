import { motion } from 'framer-motion'
import { Phone, ClipboardCheck, Banknote, PartyPopper, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

const steps = [
  {
    icon: Phone,
    num: '01',
    title: 'Anfrage stellen',
    description: 'Füllen Sie unser Formular aus oder rufen Sie uns an. In 2 Minuten erledigt.',
  },
  {
    icon: ClipboardCheck,
    num: '02',
    title: 'Fahrzeug bewerten',
    description: 'Wir prüfen Ihre Angaben und nennen Ihnen innerhalb von 24h einen fairen Preis.',
  },
  {
    icon: Banknote,
    num: '03',
    title: 'Sofort Geld erhalten',
    description: 'Bringen Sie Ihr Fahrzeug vorbei — Sofortauszahlung am selben Tag. Schnell und unkompliziert.',
  },
  {
    icon: PartyPopper,
    num: '04',
    title: 'Fertig!',
    description: 'Wir kümmern uns um Abmeldung und Papierkram. Sie müssen nichts weiter tun.',
  },
]

export default function Prozess() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="So einfach geht's"
          title="In 4 Schritten zum Verkauf"
        />
        {/* Override heading colors for dark bg */}
        <style>{`
          #prozess-heading h2 { color: white !important; }
          #prozess-heading span { color: #C9A84C !important; }
          #prozess-heading p { color: rgba(255,255,255,0.6) !important; }
        `}</style>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2" id="prozess-heading">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="text-4xl font-bold text-white/10">{step.num}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>

              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-accent/30" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            Jetzt Fahrzeug anbieten
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
