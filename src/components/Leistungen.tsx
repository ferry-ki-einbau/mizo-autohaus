import { Car, HandCoins, CreditCard, Shield, ArrowLeftRight, FileCheck, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

const services = [
  {
    icon: HandCoins,
    title: 'Fahrzeug-Ankauf',
    description: 'Wir kaufen Ihr Fahrzeug zu fairen Preisen. Schnelle Bewertung, Sofortauszahlung — ohne Umwege.',
    highlight: true,
  },
  {
    icon: Car,
    title: 'Fahrzeug-Verkauf',
    description: 'Große Auswahl an geprüften Gebrauchtwagen. Technisch geprüft und sofort verfügbar.',
  },
  {
    icon: CreditCard,
    title: 'Finanzierung',
    description: 'Flexible Finanzierungslösungen für jedes Budget. Wir finden die passende Rate.',
  },
  {
    icon: Shield,
    title: 'Garantie',
    description: 'Bis zu 24 Monate Garantie auf unsere Fahrzeuge. Sorgenfrei fahren.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Inzahlungnahme',
    description: 'Tauschen Sie Ihr altes Fahrzeug. Wir rechnen den Wert direkt an.',
  },
  {
    icon: FileCheck,
    title: 'Zulassungsdienst',
    description: 'Online-Zulassung in nur 10 Minuten. Kein Papierkram für Sie.',
  },
]

export default function Leistungen() {
  return (
    <section id="leistungen" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Unsere Leistungen"
          title="Alles rund ums Auto"
          description="Von Ankauf über Finanzierung bis zur Zulassung — bei Mizo Autohaus erhalten Sie den kompletten Service aus einer Hand."
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`reveal reveal-d${Math.min(index + 1, 5)} group rounded-2xl border transition-all duration-300 ${
                service.highlight
                  ? 'col-span-2 lg:col-span-1 lg:row-span-2 bg-primary text-white border-white/10 p-6 sm:p-8 lg:p-10 flex flex-col justify-between hover:border-accent/30'
                  : 'bg-white border-border p-4 sm:p-6 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5'
              }`}
            >
              <div>
                <div className={`rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 ${
                  service.highlight
                    ? 'w-14 h-14 lg:w-16 lg:h-16 bg-accent/20 group-hover:bg-accent/30'
                    : 'w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/25'
                }`}>
                  <service.icon className={`transition-colors ${
                    service.highlight
                      ? 'w-7 h-7 lg:w-8 lg:h-8 text-accent'
                      : 'w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-white'
                  }`} />
                </div>
                <h3 className={`font-bold mb-1 sm:mb-2 ${
                  service.highlight
                    ? 'text-xl sm:text-2xl lg:text-3xl text-white'
                    : 'text-base sm:text-lg text-primary'
                }`}>{service.title}</h3>
                <p className={`leading-relaxed ${
                  service.highlight
                    ? 'text-sm sm:text-base lg:text-lg text-white/60'
                    : 'text-text-muted text-xs sm:text-sm'
                }`}>{service.description}</p>
              </div>
              {service.highlight && (
                <button
                  onClick={() => document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-6 lg:mt-8 inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl text-sm lg:text-base font-bold transition-all hover:shadow-lg hover:shadow-accent/25 self-start"
                >
                  Fahrzeug bewerten lassen
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
