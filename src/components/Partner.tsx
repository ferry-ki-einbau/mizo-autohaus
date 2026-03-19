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
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-bg-soft"
            >
              <div className="text-3xl sm:text-4xl font-bold text-accent">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-text-muted mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <SectionHeading
          tag="Vertrauen & Qualität"
          title="Starke Partnerschaften"
          description="Wir arbeiten mit namhaften Partnern der Automobilbranche zusammen — für maximale Qualität und Zuverlässigkeit."
        />

        {/* Echtes Partner-Logo Bild vom Kunden */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden border border-border bg-white shadow-sm">
            <img
              src="/images/partner-logos.jpg"
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
