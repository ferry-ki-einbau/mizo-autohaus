import { motion } from 'framer-motion'
import AnkaufForm from '@/components/AnkaufForm'
import { Search, CheckCircle, ArrowDown, Clock, Shield, Banknote } from 'lucide-react'

export default function AutoBewertungPage() {
  return (
    <div>
      <section className="relative text-white py-16 lg:py-24 overflow-hidden"><div className="absolute inset-0"><img src="/images/hero-new-desktop.webp" alt="Kostenlose Auto Bewertung — Mizo Autohaus Hannover" className="w-full h-full object-cover object-bottom" loading="eager" /><div className="absolute inset-0 bg-primary/85" /></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent-light px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Search className="w-4 h-4" /> 100% kostenlos
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Kostenlose <span className="text-accent">Auto-Bewertung</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Wie viel ist Ihr Auto wert? Finden Sie es heraus — kostenlos, unverbindlich und in unter 2 Minuten. Wir bewerten Ihr Fahrzeug und machen Ihnen ein faires Angebot.
            </p>
            <div className="mt-8">
              <a href="/#ankauf" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all no-underline">
                Jetzt Auto bewerten
                <ArrowDown className="w-5 h-5" />
              </a>
              <AnkaufForm />
    </div>
          </motion.div>
          <AnkaufForm />
    </div>
      </section>

      <section className="py-6 bg-bg-soft border-b border-border">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-text-muted">
          <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> 100% kostenlos</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent" /> In 2 Minuten</span>
          <span className="flex items-center gap-2"><Banknote className="w-4 h-4 text-accent" /> Unverbindlich</span>
          <AnkaufForm />
    </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-6 text-text-muted leading-relaxed">
          <h2 className="text-3xl font-bold text-primary text-center">So bewerten wir Ihr Fahrzeug</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
            {[
              { num: '1', title: 'Daten eingeben', desc: 'Marke, Modell, Baujahr, Kilometerstand — fertig.' },
              { num: '2', title: 'Wir bewerten', desc: 'Unsere Experten prüfen Ihre Angaben und den Marktwert.' },
              { num: '3', title: 'Angebot erhalten', desc: 'Innerhalb von 24h bekommen Sie ein faires Angebot.' },
            ].map(step => (
              <motion.div key={step.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-6 rounded-2xl border border-border">
                <span className="text-4xl font-bold text-accent/20">{step.num}</span>
                <h3 className="font-semibold text-primary mt-2">{step.title}</h3>
                <p className="text-sm mt-1">{step.desc}</p>
              </motion.div>
            ))}
            <AnkaufForm />
    </div>

          <h3 className="text-xl font-bold text-primary pt-4">Warum eine Bewertung bei Mizo Autohaus?</h3>
          <p>
            Online-Bewertungstools geben Ihnen nur eine grobe Schätzung basierend auf Durchschnittswerten. Bei <strong className="text-primary">Mizo Autohaus</strong> bewerten wir Ihr Fahrzeug individuell — basierend auf dem tatsächlichen Zustand, der Ausstattung und der aktuellen Marktnachfrage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            {[
              'Keine Registrierung nötig',
              'Keine versteckten Kosten',
              'Keine Verpflichtung zum Verkauf',
              'Bewertung durch echte Experten',
              'Marktwert-basierte Preise',
              'Fotos erhöhen die Genauigkeit',
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-sm">
                <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                <span>{item}</span>
                <AnkaufForm />
    </div>
            ))}
            <AnkaufForm />
    </div>

          <h3 className="text-xl font-bold text-primary pt-4">Welche Fahrzeuge bewerten wir?</h3>
          <p>
            Alle. PKW, SUV, Transporter, Kleinwagen, Sportwagen. Egal ob Mercedes, BMW, VW, Audi, Tesla oder eine andere Marke. Auch Fahrzeuge mit hohem Kilometerstand, Unfallschäden oder ohne TÜV bewerten wir kostenlos. Es gibt keine Einschränkungen.
          </p>

          <div className="text-center mt-10">
            <a href="/#ankauf" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all no-underline">
              Jetzt kostenlos bewerten lassen
              <ArrowDown className="w-5 h-5" />
            </a>
            <p className="text-sm text-text-light mt-3">oder direkt anrufen: <a href="tel:+4915161861808" className="text-accent font-medium no-underline">0151 618 618 08</a></p>
            <AnkaufForm />
    </div>
          <AnkaufForm />
    </div>
      </section>
      <AnkaufForm />
    </div>
  )
}
