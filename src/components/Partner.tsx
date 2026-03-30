import SectionHeading from './SectionHeading'
import AnimatedCounter from './AnimatedCounter'
import { SixtLogo, AvisLogo, TeslaLogo, CATLogo, FordLogo, RosierLogo, VorallerLogo, SantanderLogo } from './logos/PartnerLogos'

const stats = [
  { end: 500, suffix: '+', label: 'Fahrzeuge verkauft' },
  { end: 98, suffix: '%', label: 'Zufriedene Kunden' },
  { end: 24, suffix: 'h', label: 'Angebot erhalten' },
  { end: 10, suffix: ' Min', label: 'Online-Zulassung' },
]

const partners = [
  { Logo: SixtLogo, name: 'Sixt' },
  { Logo: AvisLogo, name: 'Avis' },
  { Logo: TeslaLogo, name: 'Tesla' },
  { Logo: CATLogo, name: 'CAT Germany' },
  { Logo: FordLogo, name: 'Ford' },
  { Logo: RosierLogo, name: 'Rosier' },
  { Logo: VorallerLogo, name: 'Voraller' },
]

export default function Partner() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-2 sm:gap-5 lg:gap-8 mb-16 sm:mb-20 lg:mb-28">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`reveal reveal-d${index + 1} text-center p-3 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-bg-soft border border-border hover:border-accent/20 transition-all duration-300 group`}
            >
              <div className="text-2xl sm:text-4xl lg:text-6xl font-black text-accent leading-none group-hover:scale-105 transition-transform duration-300 whitespace-nowrap">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] sm:text-sm lg:text-base text-text-muted mt-1 lg:mt-3 font-medium leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        <SectionHeading
          tag="Vertrauen & Qualität"
          title="Starke Partnerschaften"
          description="Wir arbeiten mit namhaften Partnern der Automobilbranche zusammen."
        />

        <div className="max-w-4xl mx-auto reveal space-y-6">
          {/* Partner Logos Grid */}
          <div className="rounded-2xl lg:rounded-3xl border border-border bg-white shadow-sm p-8 sm:p-12">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-8 items-center justify-items-center">
              {partners.map(({ Logo, name }) => (
                <div
                  key={name}
                  className="flex items-center justify-center w-full h-12 opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <Logo className="w-full h-full max-w-[110px] object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Santander Finanzierungspartner */}
          <div className="rounded-2xl lg:rounded-3xl border border-border bg-white shadow-sm px-8 py-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
            <div className="flex-shrink-0">
              <SantanderLogo className="h-10 w-auto" />
            </div>
            <div className="h-px w-full sm:h-12 sm:w-px bg-border flex-shrink-0" />
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-1">Offizieller Finanzierungspartner</p>
              <p className="text-sm text-text-muted leading-relaxed">
                Als zertifizierter Santander-Partner bieten wir Ihnen flexible Fahrzeugfinanzierungen — schnell, transparent und zu fairen Konditionen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
