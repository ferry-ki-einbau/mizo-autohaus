import { motion } from 'framer-motion'
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
        {/* Stats — Desktop: riesige Zahlen, dramatisch */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-8 mb-16 sm:mb-20 lg:mb-28">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-4 sm:p-6 lg:p-10 rounded-2xl lg:rounded-3xl bg-bg-soft border border-border hover:border-accent/20 transition-all duration-300 group"
            >
              <div className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-accent group-hover:scale-105 transition-transform duration-300">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-sm lg:text-base text-text-muted mt-1 lg:mt-3 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <SectionHeading
          tag="Vertrauen & Qualität"
          title="Starke Partnerschaften"
          description="Wir arbeiten mit namhaften Partnern der Automobilbranche zusammen — für maximale Qualität und Zuverlässigkeit."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl lg:rounded-3xl overflow-hidden border border-border bg-white shadow-sm">
            <img
              src="/images/partner-logos.webp"
              alt="Partner von Mizo Autohaus: Sixt, Avis, Tesla, CAT Germany, Autohaus König, Ford, Rosier, Voraller"
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
              width={1280}
              height={854}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
