import { Phone, ClipboardCheck, Banknote, PartyPopper, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Phone,
    num: '01',
    title: 'Anfrage stellen',
    description: 'Formular ausfüllen oder anrufen. In 2 Minuten erledigt.',
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
    description: 'Bringen Sie Ihr Fahrzeug vorbei — Sofortauszahlung am selben Tag.',
  },
  {
    icon: PartyPopper,
    num: '04',
    title: 'Fertig!',
    description: 'Wir kümmern uns um Abmeldung und Papierkram. Sie müssen nichts tun.',
  },
]

export default function Prozess() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 lg:w-[700px] h-96 lg:h-[500px] bg-accent/8 rounded-full blur-[150px] lg:blur-[200px]" />
      <div className="absolute bottom-0 right-1/4 w-80 lg:w-[500px] h-80 lg:h-[400px] bg-accent/6 rounded-full blur-[120px] lg:blur-[180px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-20 reveal">
          <span className="inline-block text-accent font-bold text-xs sm:text-sm tracking-wider uppercase mb-2 sm:mb-3">
            So einfach geht's
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white leading-tight">
            In 4 Schritten zum Verkauf
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[60px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-[2px] bg-gradient-to-r from-accent/30 via-accent/15 to-accent/30" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`reveal reveal-d${i + 1} relative p-3.5 sm:p-6 lg:p-8 rounded-2xl bg-white/[0.07] border border-white/[0.12] hover:bg-white/[0.12] hover:border-accent/30 transition-all duration-300 group lg:text-center`}
              >
                <div className="flex items-center justify-between lg:justify-center mb-3 lg:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-accent/15 flex items-center justify-center group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/30 transition-all duration-300">
                    <step.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-2xl sm:text-5xl lg:hidden font-black text-white/[0.06]">{step.num}</span>
                </div>
                <div className="hidden lg:block text-accent/70 text-xs font-bold tracking-widest uppercase mb-2">Schritt {step.num}</div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm lg:text-base text-white/75 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10 sm:mt-12 lg:mt-16 reveal">
          <button
            onClick={() => document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 lg:px-10 lg:py-5 rounded-xl text-lg lg:text-xl font-bold transition-all hover:shadow-xl hover:shadow-accent/30 hover:scale-[1.02]"
          >
            Jetzt Fahrzeug anbieten
            <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
