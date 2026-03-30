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

        <div className="max-w-4xl mx-auto reveal space-y-6">
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

          {/* Santander Finanzierungspartner */}
          <div className="rounded-2xl lg:rounded-3xl border border-border bg-white shadow-sm px-8 py-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
            <div className="flex-shrink-0">
              {/* Santander Official Logo SVG */}
              <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Santander">
                {/* Flame */}
                <path d="M12 2C12 2 6 8 6 16c0 3.3 1.3 6.3 3.4 8.5C10.5 25.7 12 27.8 12 30c0 2.2-1.5 4-3.4 4.8C10.2 36.2 12 37 14 37c4.4 0 8-3.6 8-8 0-3-1.6-5.6-4-7.1V20c0-5.5-3-10.4-6-18z" fill="#EC0000"/>
                <path d="M18 8C18 8 14 13 14 19c0 2.5 1 4.8 2.6 6.5C17.6 26.5 19 28.2 19 30c0 1.7-1.1 3.2-2.7 3.7C17.4 34.5 18.7 35 20 35c3.3 0 6-2.7 6-6 0-2.3-1.2-4.3-3-5.5V22c0-5-2-9-5-14z" fill="#EC0000" opacity="0.7"/>
                {/* Text */}
                <text x="32" y="27" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18" fill="#EC0000" letterSpacing="0.5">Santander</text>
              </svg>
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
