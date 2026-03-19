import { motion } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Sie möchten Ihr Auto verkaufen?
        </h2>
        <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
          2 Minuten Formular ausfüllen — wir melden uns noch heute mit einem fairen Angebot. Deutschlandweit.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/#ankauf"
            className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:shadow-lg hover:shadow-accent/25 no-underline"
          >
            Kostenlose Bewertung anfordern
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="tel:+4915161861808"
            className="flex items-center gap-2 border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all no-underline"
          >
            <Phone className="w-5 h-5" />
            Lieber anrufen? 0151 618 618 08
          </a>
        </div>
      </motion.div>
    </section>
  )
}
