import { motion } from 'framer-motion'
import { ArrowDown, Shield, Clock, Banknote, Phone } from 'lucide-react'

export default function Hero() {
  const scrollToAnkauf = () => {
    document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden min-h-[70vh] sm:min-h-[80vh] flex items-end sm:items-center">
      {/* Background — gleiches Bild auf Desktop + Mobile */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-autohaus.jpg"
          alt="Mizo Autohaus Hannover — Fahrzeuge auf dem Hof"
          className="w-full h-full object-cover object-bottom sm:object-center"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/60 to-primary/80 sm:bg-gradient-to-r sm:from-primary/90 sm:via-primary/70 sm:to-primary/40" />
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent-light px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-accent/20">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Jetzt Fahrzeug bewerten lassen
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Wir kaufen
            <br />
            <span className="text-accent">Ihr Fahrzeug.</span>
            <br />
            <span className="text-white/80 text-3xl sm:text-4xl lg:text-5xl">Angebot noch heute. Garantiert.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed"
          >
            Erhalten Sie innerhalb von 24 Stunden ein faires Angebot für Ihr Fahrzeug. Kostenlose Bewertung, sofortige Auszahlung, keine versteckten Kosten.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={scrollToAnkauf}
              className="group bg-white text-primary px-10 py-5 rounded-xl text-xl font-bold transition-all hover:bg-accent hover:text-white shadow-2xl shadow-white/20 hover:shadow-accent/30 flex items-center justify-center gap-3 "
            >
              Jetzt Auto verkaufen
              <ArrowDown className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <a
              href="tel:+4915161861808"
              className="bg-accent/20 border-2 border-accent/40 hover:bg-accent/30 text-white px-8 py-5 rounded-xl text-xl font-bold transition-all flex items-center justify-center gap-3 no-underline backdrop-blur-sm"
            >
              <Phone className="w-6 h-6" />
              0151 618 618 08
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-6 sm:gap-8"
          >
            {[
              { icon: Shield, text: '500+ Fahrzeuge angekauft' },
              { icon: Clock, text: 'Angebot noch heute' },
              { icon: Banknote, text: 'Sofortauszahlung' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/60 text-sm">
                <Icon className="w-4 h-4 text-accent" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
