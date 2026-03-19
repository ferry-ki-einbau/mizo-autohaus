import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const bewertungen = [
  {
    name: 'Imad',
    zeit: 'vor 2 Jahren',
    sterne: 5,
    text: 'Der Verkaufsberater war sehr freundlich und kompetent. Er hat sich Zeit genommen, um meine Bedürfnisse zu verstehen. Ich kann das Autohaus jedem empfehlen!',
  },
  {
    name: 'Jumbo G.',
    zeit: 'vor 2 Jahren',
    sterne: 5,
    text: 'Was man hier positiv festhalten muss sind die Preise. Bezahlbar und fair für beide Parteien. Habe den Laden vielen Freunden empfohlen.',
  },
  {
    name: 'Monika K.',
    zeit: 'vor einem Jahr',
    sterne: 5,
    text: 'Beste Menschen in Hannover, immer hilfsbereit, finden für alles eine Lösung und haben mir richtig gut und unproblematisch geholfen.',
  },
  {
    name: 'Mustafa C.',
    zeit: 'vor 2 Jahren',
    sterne: 5,
    text: 'Sehr netter Verkäufer, und hat sich stets an sein Wort gehalten was den TÜV und die Anmeldung betrifft. Weiter zu empfehlen, top!',
  },
  {
    name: 'Nader S.',
    zeit: 'vor 2 Jahren',
    sterne: 5,
    text: 'Top Preise, top Service. Sehr hilfsbereit, freundlich und ehrlich.',
  },
  {
    name: 'Atelva Media GmbH',
    zeit: 'vor 2 Jahren',
    sterne: 5,
    text: 'Wir sind mega zufrieden und können das Autohaus vorbehaltlos empfehlen. Preis/Leistungsverhältnis stimmt hier einfach.',
  },
  {
    name: 'Mohamed A.',
    zeit: 'vor 11 Monaten',
    sterne: 5,
    text: 'Top Beratung, top Preis-Leistungs-Verhältnis.',
  },
  {
    name: 'Tarek G.',
    zeit: 'vor 2 Jahren',
    sterne: 5,
    text: 'Der beste Mann und sehr hilfreich. Bin ich immer wieder bei ihm.',
  },
]

// Auf Mobile nur die besten 4 Reviews zeigen (kein horizontaler Scroll)
const mobileReviews = bewertungen.slice(0, 4)

function ReviewCard({ b, i }: { b: typeof bewertungen[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col lg:hover:bg-white/[0.07] lg:hover:border-accent/15 transition-all duration-300 lg:group"
    >
      {/* Quote + Stars */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-accent/20" />
        <div className="flex gap-0.5">
          {Array.from({ length: b.sterne }).map((_, s) => (
            <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>

      {/* Text */}
      <p className="text-white/70 text-sm leading-relaxed flex-1">
        "{b.text}"
      </p>

      {/* Author */}
      <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-white/[0.06] flex items-center gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent/15 flex items-center justify-center text-accent font-bold text-xs sm:text-sm">
          {b.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-white text-sm">{b.name}</p>
          <p className="text-xs text-white/40">{b.zeit}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Bewertungen() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => el.removeEventListener('scroll', checkScroll)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('[data-review]')?.clientWidth || 360
    el.scrollBy({ left: dir === 'right' ? cardWidth + 20 : -(cardWidth + 20), behavior: 'smooth' })
  }

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-primary relative overflow-hidden">
      {/* Rote Glow-Effekte */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-accent/6 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/4 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header mit Google Rating */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 sm:gap-6 mb-8 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent font-bold text-xs sm:text-sm tracking-wider uppercase mb-2 sm:mb-3">
              Kundenstimmen
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Das sagen unsere Kunden
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {/* Google Rating Badge */}
            <div className="flex items-center gap-3 bg-white/[0.06] border border-white/[0.1] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 backdrop-blur-sm">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-white font-black text-base sm:text-lg">5.0</span>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <span className="text-white/50 text-[10px] sm:text-xs">Google Bewertungen</span>
              </div>
            </div>

            {/* Navigation Arrows — nur Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="p-2.5 rounded-xl border border-white/10 hover:border-accent/40 hover:bg-accent/10 disabled:opacity-20 transition-all text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="p-2.5 rounded-xl border border-white/10 hover:border-accent/40 hover:bg-accent/10 disabled:opacity-20 transition-all text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* MOBILE: Vertikales Grid — kein horizontaler Scroll, kein Touch-Conflict */}
        <div className="grid grid-cols-1 gap-4 sm:hidden">
          {mobileReviews.map((b, i) => (
            <ReviewCard key={i} b={b} i={i} />
          ))}
        </div>

        {/* DESKTOP/TABLET: Horizontaler Scroll mit Arrows */}
        <div
          ref={scrollRef}
          className="hidden sm:flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {bewertungen.map((b, i) => (
            <div
              key={i}
              data-review
              className="min-w-[340px] lg:min-w-[360px] max-w-[360px] snap-start shrink-0"
            >
              <ReviewCard b={b} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
