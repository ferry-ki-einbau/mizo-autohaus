import { motion } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-primary relative overflow-hidden">
      {/* Dramatische Glow-Effekte */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[900px] h-[400px] lg:h-[600px] bg-accent/8 rounded-full blur-[150px] lg:blur-[250px]" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
          Sie möchten Ihr Auto{' '}
          <span className="text-accent">verkaufen?</span>
        </h2>
        <p className="mt-4 lg:mt-6 text-lg lg:text-xl text-white/55 max-w-2xl mx-auto">
          2 Minuten Formular ausfüllen — wir melden uns noch heute mit einem fairen Angebot. Deutschlandweit.
        </p>
        <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/#ankauf"
            className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 lg:px-12 lg:py-6 rounded-xl text-lg lg:text-xl font-bold transition-all hover:shadow-2xl hover:shadow-accent/40 hover:scale-[1.02] no-underline"
          >
            Kostenlose Bewertung anfordern
            <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </a>
          <a
            href="tel:+4915161861808"
            className="flex items-center gap-2 border-2 border-white/15 hover:border-white/30 text-white px-8 py-4 lg:px-10 lg:py-6 rounded-xl text-lg lg:text-xl font-bold transition-all no-underline"
          >
            <Phone className="w-5 h-5 lg:w-6 lg:h-6" />
            Lieber anrufen?
          </a>
        </div>
      </motion.div>
    </section>
  )
}
