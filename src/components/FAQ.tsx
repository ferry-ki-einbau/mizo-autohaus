import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeading from './SectionHeading'

const faqs = [
  {
    q: 'Welche Fahrzeuge kaufen Sie an?',
    a: 'Wir kaufen alle Marken und Modelle — PKW, SUV, Transporter, Sportwagen. Auch Fahrzeuge mit hoher Laufleistung, ohne TÜV oder mit Unfallschaden. Fragen Sie einfach an.',
  },
  {
    q: 'Wie schnell bekomme ich ein Angebot?',
    a: 'Innerhalb von 24 Stunden nach Ihrer Anfrage. In den meisten Fällen sogar noch am selben Tag. Füllen Sie einfach unser Formular aus oder rufen Sie uns an.',
  },
  {
    q: 'Wie läuft die Bezahlung ab?',
    a: 'Nach der Einigung erhalten Sie ein verbindliches Fixum — kein Nachverhandeln. Sie bringen Ihr Fahrzeug vorbei oder wir holen es bundesweit ab. Bezahlung sofort: Bargeld oder Überweisung, Sie entscheiden. Am selben Tag erledigt.',
  },
  {
    q: 'Muss ich mein Auto abmelden?',
    a: 'Nein, das übernehmen wir komplett. Abmeldung, Ummeldung, Versicherungskündigung — wir kümmern uns um den gesamten Papierkram.',
  },
  {
    q: 'Kann ich mein altes Auto in Zahlung geben?',
    a: 'Ja! Wir rechnen den Wert Ihres alten Fahrzeugs direkt auf den Kaufpreis eines neuen an. So sparen Sie sich den privaten Verkauf.',
  },
  {
    q: 'Bieten Sie Finanzierung an?',
    a: 'Ja, wir bieten flexible Finanzierungslösungen an. Gemeinsam finden wir die passende monatliche Rate für Ihr Budget.',
  },
  {
    q: 'Was ist der Online-Zulassungsdienst?',
    a: 'Wir erledigen Ihre Zulassung in nur 10 Minuten — Neuzulassung, Ummeldung oder Abmeldung. Kein Warten bei der Zulassungsstelle, kein Papierkram.',
  },
  {
    q: 'Holen Sie mein Auto auch ab?',
    a: 'Ja! Wir holen Ihr Fahrzeug deutschlandweit kostenlos ab. Egal ob Berlin, München oder Hamburg — wir kommen zu Ihnen. Bezahlung erfolgt bei Abholung, direkt vor Ort.',
  },
  {
    q: 'Wo finde ich Sie?',
    a: 'Vahrenwalder Str. 35, 30165 Hannover. Geöffnet Mo–Fr 09:00–18:00 und Sa 09:00–16:00. Kostenlose Parkplätze direkt vor dem Autohaus.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-4 text-left hover:bg-bg-soft/50 transition-colors min-h-[52px]"
      >
        <span className="font-bold text-primary pr-4 text-sm sm:text-base">{q}</span>
        <ChevronDown className={cn(
          'w-5 h-5 text-text-muted shrink-0 transition-transform duration-200',
          open && 'rotate-180'
        )} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 sm:px-6 pb-5 text-text-muted leading-relaxed text-sm sm:text-base">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="Häufige Fragen"
          title="Alles was Sie wissen müssen"
        />
        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </div>
      </div>
    </section>
  )
}
