import SectionHeading from './SectionHeading'
import AnimatedCounter from './AnimatedCounter'

const stats = [
  { end: 500, suffix: '+', label: 'Fahrzeuge verkauft' },
  { end: 98, suffix: '%', label: 'Zufriedene Kunden' },
  { end: 24, suffix: 'h', label: 'Angebot erhalten' },
  { end: 10, suffix: ' Min', label: 'Online-Zulassung' },
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

        <div className="max-w-4xl mx-auto reveal">
          <div className="rounded-2xl lg:rounded-3xl overflow-hidden border border-border bg-white shadow-sm">
            <img
              src="/images/partner-logos.webp"
              alt="Partner von Mizo Autohaus"
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
              width={1280}
              height={854}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
