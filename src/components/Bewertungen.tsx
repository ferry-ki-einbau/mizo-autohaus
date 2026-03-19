import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import SectionHeading from './SectionHeading'

const bewertungen = [
  {
    name: 'Imad',
    zeit: 'vor 2 Jahren',
    sterne: 5,
    text: 'Der Verkaufsberater war sehr freundlich und kompetent. Er hat sich Zeit genommen, um meine Bedürfnisse zu verstehen. Das Fahrzeug war in sehr gepflegtem Zustand. Die Garantie hat mir zusätzliche Sicherheit gegeben. Ich kann das Autohaus jedem empfehlen!',
  },
  {
    name: 'Jumbo G.',
    zeit: 'vor 2 Jahren',
    sterne: 5,
    text: 'Was man hier positiv festhalten muss sind die Preise. Klar jeder will verdienen, aber es muss auch bezahlbar und fair für beide Parteien sein. Und das ist es hier alle Male. Habe den Laden vielen Freunden empfohlen.',
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

export default function Bewertungen() {
  const [current, setCurrent] = useState(0)
  const visibleCount = 3
  const maxStart = bewertungen.length - visibleCount

  const next = () => setCurrent(c => Math.min(c + 1, maxStart))
  const prev = () => setCurrent(c => Math.max(c - 1, 0))

  return (
    <section className="py-20 bg-bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <SectionHeading
              tag="Kundenstimmen"
              title="Das sagen unsere Kunden"
              center={false}
            />
          </div>
          <div className="flex items-center gap-3 mb-12">
            <div className="flex items-center gap-1 mr-4">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className="w-5 h-5 fill-accent text-accent" />
              ))}
              <span className="ml-2 text-sm font-semibold text-primary">5.0</span>
              <span className="text-sm text-text-muted ml-1">auf Google</span>
            </div>
            <button onClick={prev} disabled={current === 0} className="p-2 rounded-lg border border-border hover:border-accent disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={next} disabled={current >= maxStart} className="p-2 rounded-lg border border-border hover:border-accent disabled:opacity-30 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${current * (100 / visibleCount + 2)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {bewertungen.map((b, i) => (
              <div
                key={i}
                className="min-w-[300px] sm:min-w-[calc(33.333%-16px)] bg-white rounded-2xl border border-border p-6 flex flex-col"
              >
                <Quote className="w-8 h-8 text-accent/20 mb-3" />
                <p className="text-text-muted text-sm leading-relaxed flex-1">
                  "{b.text}"
                </p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary text-sm">{b.name}</p>
                    <p className="text-xs text-text-light">{b.zeit}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: b.sterne }).map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
