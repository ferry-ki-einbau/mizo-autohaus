import { motion } from 'framer-motion'
import { FileCheck, Clock, Shield, CheckCircle } from 'lucide-react'
import SectionHeading from '@/components/SectionHeading'
import ZulassungForm from '@/components/ZulassungForm'

const steps = [
  { num: '01', title: 'Formular ausfüllen', description: 'Tragen Sie Ihre Fahrzeug- und Halterdaten ein.' },
  { num: '02', title: 'Dokumente hochladen', description: 'Laden Sie die benötigten Unterlagen hoch.' },
  { num: '03', title: 'Bestätigung erhalten', description: 'Wir bearbeiten Ihren Antrag und senden die Bestätigung.' },
  { num: '04', title: 'Kennzeichen abholen', description: 'Holen Sie Ihre neuen Kennzeichen bei uns ab.' },
]

const advantages = [
  { icon: Clock, title: 'In 10 Minuten', description: 'Schneller als jede Zulassungsstelle' },
  { icon: Shield, title: 'Sicher & Legal', description: 'Offizieller Zulassungsdienst' },
  { icon: FileCheck, title: 'Komplett-Service', description: 'Neuzulassung, Ummeldung, Abmeldung' },
]

export default function ZulassungPage() {
  return (
    <div className="pt-8">
      {/* Hero */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-accent/20 text-accent-light px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <FileCheck className="w-4 h-4" />
              Online-Zulassungsdienst
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Zulassung in <span className="text-accent">10 Minuten</span>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              Neuzulassung, Ummeldung oder Abmeldung — wir erledigen den Papierkram. Schnell, günstig und ohne Warteschlange.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((adv, i) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <adv.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-primary mb-1">{adv.title}</h3>
              <p className="text-sm text-text-muted">{adv.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-bg-soft">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeading tag="So funktioniert's" title="In 4 einfachen Schritten" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 bg-white rounded-2xl border border-border"
              >
                <span className="text-4xl font-bold text-accent/20">{step.num}</span>
                <h4 className="font-semibold text-primary mt-2">{step.title}</h4>
                <p className="text-sm text-text-muted mt-1">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          <SectionHeading
            tag="Zulassung beauftragen"
            title="Jetzt Antrag stellen"
            description="Füllen Sie das Formular Schritt für Schritt aus — wir kümmern uns um den Rest."
          />
          <ZulassungForm />
        </div>
      </section>

      {/* Trust */}
      <section className="py-12 bg-bg-soft">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-text-muted">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-sm">Offizieller Zulassungsdienst — Vahrenwalder Str. 35, 30165 Hannover</span>
          </div>
        </div>
      </section>
    </div>
  )
}