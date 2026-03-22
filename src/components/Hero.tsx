import { motion } from 'framer-motion'
import { ArrowDown, Shield, Clock, Banknote, Phone, Star } from 'lucide-react'

export default function Hero() {
  const scrollToAnkauf = () => {
    document.getElementById('ankauf')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen flex items-end sm:items-center">
      {/* Background — Retina-ready responsive WebP */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-new-desktop.webp"
          srcSet="/images/hero-new-mobile.webp 414w, /images/hero-new-tablet.webp 1440w, /images/hero-new-desktop.webp 1920w"
          sizes="100vw"
          alt="Mizo Autohaus Hannover — Fahrzeuge auf dem Hof"
          className="w-full h-full object-cover object-bottom sm:object-center"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        {/* Dramatisches Dark Overlay — Desktop stärker links */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-black/90 sm:bg-gradient-to-r sm:from-black/95 sm:via-black/70 sm:to-black/20" />
      </div>

      {/* Rote Lichtlinie oben */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Rote Glow-Effekte — Desktop größer */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 lg:w-[600px] lg:h-[600px] bg-accent/10 rounded-full blur-[120px] lg:blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 lg:w-[500px] lg:h-[500px] bg-accent/6 rounded-full blur-[100px] lg:blur-[180px]" />

      {/* Dezentes Raster-Pattern Desktop */}
      <div className="hidden lg:block absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 pb-12 sm:py-16 lg:py-32">
        <div className="max-w-3xl lg:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-accent/15 backdrop-blur-sm text-accent-light px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-5 sm:mb-6 lg:mb-8 border border-accent/25">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse" />
              Jetzt Fahrzeug bewerten lassen
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[2.25rem] leading-[1.05] sm:text-5xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight"
          >
            Wir kaufen
            <br />
            <span className="text-accent">Ihr Fahrzeug.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-xl lg:text-2xl text-white/75 max-w-xl lg:max-w-2xl leading-relaxed"
          >
            Innerhalb von 24 Stunden ein faires Angebot. Kostenlose Bewertung, Sofortauszahlung.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <button
              onClick={scrollToAnkauf}
              className="group bg-accent hover:bg-accent-dark text-white px-8 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6 rounded-xl text-lg sm:text-xl lg:text-2xl font-bold transition-all shadow-2xl shadow-accent/30 hover:shadow-accent/50 flex items-center justify-center gap-3 hover:scale-[1.02] min-h-[52px]"
            >
              Jetzt Auto verkaufen
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
            </button>
            <a
              href="tel:+4915161861808"
              className="bg-white/10 border-2 border-white/20 hover:bg-white/15 hover:border-white/30 text-white px-6 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6 rounded-xl text-lg sm:text-xl lg:text-2xl font-bold transition-all flex items-center justify-center gap-3 no-underline backdrop-blur-sm min-h-[52px]"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              0151 618 618 08
            </a>
          </motion.div>

          {/* Trust badges — Desktop prominenter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 sm:mt-12 lg:mt-16 flex flex-wrap gap-4 sm:gap-6 lg:gap-0"
          >
            {[
              { icon: Shield, text: '500+ Fahrzeuge angekauft' },
              { icon: Clock, text: 'Angebot noch heute' },
              { icon: Banknote, text: 'Sofortauszahlung' },
              { icon: Star, text: '5.0 Google Rating' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-white/70 text-xs sm:text-sm lg:text-base lg:pr-8 lg:mr-8 lg:border-r lg:border-white/10 last:border-0 last:mr-0 last:pr-0">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-accent" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
