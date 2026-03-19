import { X, Shield, CheckCircle, Phone, Clock, Wrench, Car, FileCheck, BadgeCheck } from 'lucide-react'
import { useEffect } from 'react'

const garantieLeistungen = [
  { icon: Car, title: 'Motor & Getriebe', text: 'Kompletter Schutz für Motor, Turbolader, Getriebe und Antriebswellen.' },
  { icon: Wrench, title: 'Elektrik & Elektronik', text: 'Steuergeräte, Lichtmaschine, Anlasser, Klimaanlage und Bordelektronik.' },
  { icon: Shield, title: 'Fahrwerk & Lenkung', text: 'Achsgelenke, Stoßdämpfer, Lenkgetriebe und Radlager abgesichert.' },
  { icon: CheckCircle, title: 'Bremssystem', text: 'Bremssättel, Hauptbremszylinder und ABS-Steuergerät inklusive.' },
  { icon: BadgeCheck, title: 'Kühlung & Heizung', text: 'Wasserpumpe, Kühler, Thermostat und Heizungswärmetauscher.' },
  { icon: FileCheck, title: 'Kraftstoffsystem', text: 'Einspritzanlage, Kraftstoffpumpe und Druckregler geschützt.' },
]

const vorteile = [
  'Bis zu 24 Monate Laufzeit',
  'Deutschlandweiter Werkstattservice',
  'Keine Selbstbeteiligung',
  'Reparatur in unserer eigenen Werkstatt',
  'Inklusive Abschlepp- und Pannenhilfe',
  'Übertragbar bei Weiterverkauf',
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function GarantieBroschuere({ open, onClose }: Props) {
  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-2xl">
        {/* Header — Dark mit rotem Akzent */}
        <div className="bg-primary text-white p-6 sm:p-8 sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-accent text-xs font-bold uppercase tracking-wider">Mizo Autohaus</p>
              <h2 className="text-xl sm:text-2xl font-black">Garantie-Broschüre</h2>
            </div>
          </div>
          <p className="text-white/60 text-sm">Bis zu 24 Monate Schutz für Ihr Fahrzeug — ohne Selbstbeteiligung.</p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Was ist abgedeckt */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Was ist abgedeckt?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {garantieLeistungen.map((item) => (
                <div key={item.title} className="flex gap-3 p-3 rounded-xl bg-bg-soft border border-border">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">{item.title}</p>
                    <p className="text-text-muted text-xs mt-0.5 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vorteile */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Ihre Vorteile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vorteile.map((v) => (
                <div key={v} className="flex items-center gap-2.5 py-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm text-text-muted">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eigene Werkstatt Highlight */}
          <div className="bg-primary rounded-2xl p-5 sm:p-6 text-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-base">Eigene Werkstatt vor Ort</h4>
                <p className="text-white/60 text-sm mt-1 leading-relaxed">
                  Garantiefälle werden direkt in unserer hauseigenen Werkstatt in Hannover bearbeitet — schnell, unkompliziert und ohne lange Wartezeiten. Sie müssen Ihr Fahrzeug nicht einschicken oder wochenlang warten.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+4915161861808"
              className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white py-3.5 rounded-xl font-bold transition-colors no-underline text-sm"
            >
              <Phone className="w-4 h-4" />
              Garantie anfragen
            </a>
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-border hover:bg-bg-soft text-primary py-3.5 rounded-xl font-bold transition-colors text-sm"
            >
              <Clock className="w-4 h-4" />
              Später entscheiden
            </button>
          </div>

          <p className="text-[11px] text-text-light text-center">
            Die Garantie ist optional und kann beim Fahrzeugkauf hinzugebucht werden. Details und Konditionen besprechen wir gerne persönlich mit Ihnen.
          </p>
        </div>
      </div>
    </div>
  )
}
